import {
  CodeChallengeMethodType,
  FetchClient,
  OAuthAccessTokenRequestPKCE,
  OAuthAuthorizeParameters,
  OAuthCodeChallengeStruct,
  OAuthEndpoints,
  OAuthRefreshTokensRequestPKCE,
  OAuthRequestTokenResponse,
  OAuthSettings,
  OAuthTokens,
  OAuthValidationParameters,
} from '../types';
import { CODE_VERIFIER_LENGTH, debug } from '../helpers';
import { base64urlencode } from '../utils';
import { AppError } from '../utils/error';
import { resolveUrl } from '../utils/network.util';
import { generateRandomValue, hash } from './crypto';
import { RequestBuilder, URLBuilder } from './request.builder';

// https://github.com/panva/oauth4webapi/blob/main/src/index.ts

// return fetch(url.href, {
//   headers,
//   method: 'GET',
//   redirect: 'manual',
//   signal: options?.signal ? signal(options.signal) : null,
// }).then(processDpopNonce)

const DEFAULT_ENDPOINTS: Record<OAuthEndpoints, string> = {
  authorizationEndpoint: '/authorize',
  tokenEndpoint: '/api/token',
  discoveryEndpoint: '/.well-known/openid-configuration',
  // discoveryEndpoint: '/.well-known/oauth-authorization-server',
};

export const getEndpoint = (
  hostname: string,
  endpoint: OAuthEndpoints,
  endpointRecord?: Record<OAuthEndpoints, string>
): URL | string => {
  if (endpointRecord && endpoint in endpointRecord) {
    return resolveUrl(endpointRecord[endpoint], hostname);
  }

  if (endpoint in DEFAULT_ENDPOINTS) {
    return resolveUrl(DEFAULT_ENDPOINTS[endpoint], hostname);
  }

  // return null;

  // Since we have defaultEndpoints to all possible values
  // we could return null but endpoint type restricts possible values and only
  // way to bypass this is to pass value as 'any' type
  throw new AppError({
    name: 'ENDPOINT_NOT_FOUND',
    message: `Endpoint not existent, please pass valid one`,
  });
};

/**
 * Generate authentication URI from passed configuration
 *
 * @param {OAuthAuthorizeParameters} options
 * @returns {string} generated authorization URL
 */
export const getAuthorizeURL = (options: OAuthAuthorizeParameters): string => {
  const scope = Array.isArray(options.scope) ? options.scope.join(' ') : options.scope;

  const endpoint = getEndpoint(options.server, 'authorizationEndpoint');

  const urlBuilder = new URLBuilder(endpoint, {
    client_id: options.clientId,
    response_type: options.responseType,
    redirect_uri: options.redirectUri,
    scope,
  });

  if (options?.showDialog) {
    urlBuilder.addParameters({
      show_dialog: options.showDialog + '', // URLSearchParams accepts only string as value
    });
  }

  if (options?.state) {
    urlBuilder.addParameters({
      state: options.state,
    });
  }

  if (options?.codeChallengeMethod && options?.codeChallenge) {
    urlBuilder.addParameters({
      code_challenge: options.codeChallenge,
      code_challenge_method: options.codeChallengeMethod,
    });
  }

  return urlBuilder.toString();
};

export const getTokenRequestURLBuilder = (
  endpoint: URL | string,
  options: OAuthAccessTokenRequestPKCE | OAuthRefreshTokensRequestPKCE
): URLBuilder => {
  const urlBuilder = new URLBuilder(endpoint, {
    client_id: this.settings.clientId,
  });

  switch (options.grantType) {
    case 'authorization_code': {
      urlBuilder.addParameters({
        grant_type: options.grantType,
        code: options.code,
        redirect_uri: options.redirectUri,
        code_verifier: options.codeVerifier,
      });

      break;
    }
    case 'refresh_token': {
      urlBuilder.addParameters({
        grant_type: options.grantType,
        refresh_token: options.refreshToken,
      });
      break;
    }
  }

  return urlBuilder;
};

export class OAuthBaseAuthenticator {
  private async discover() {
    try {
      const endpoint = this.getEndpoint('discoveryEndpoint');
      console.log(endpoint.toString());

      const response = await this.fetchClient.fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        mode: 'no-cors',
      });

      console.log(response);

      if (!response.headers.get('Content-Type')?.startsWith('application/json')) {
        throw new AppError({
          name: 'DISCOVERY_CONTENT_TYPE_ERROR',
          message: `Received response was not JSON response`,
        });
      }

      const responseJson = await response.json();

      console.log(responseJson);
    } catch (error) {
      const message = error instanceof Error ? error.message : `OpenID discovery fetch failed`;

      throw new AppError({
        name: 'DISCOVERY_CONFIGURATION_ERROR',
        message,
        cause: error,
      });
    }
  }

  public async accessToken(options: Omit<OAuthAccessTokenRequestPKCE, 'grantType'>): Promise<OAuthTokens | null> {
    return this.request('tokenEndpoint', { ...options, grantType: 'authorization_code' });
  }

  public async refreshToken(options: Omit<OAuthRefreshTokensRequestPKCE, 'grantType'>): Promise<OAuthTokens | null> {
    return this.request('tokenEndpoint', { ...options, grantType: 'refresh_token' });
  }

  private async request(
    endpoint: OAuthEndpoints,
    // make union of possible options
    options: OAuthAccessTokenRequestPKCE | OAuthRefreshTokensRequestPKCE
  ): Promise<OAuthTokens> {
    const endpointUri = this.getEndpoint(endpoint);
    const basicAuth = this.getBasicAuthToken();

    if (basicAuth === null) {
      throw new AppError({
        name: 'BASIC_AUTH_CONFIGURATION_ERROR',
        message: `Client secret not provided`,
      });
    }

    const requestTokenURL = this.getTokenRequestURLBuilder(endpointUri, options);
    const queryStringBody = requestTokenURL.getSearchParams().toString();

    const requestBuilder = new RequestBuilder(endpointUri, {
      method: 'POST',
      body: queryStringBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`,
      },
    });

    const requestInstance = requestBuilder.getRequest();

    try {
      const request = await this.fetchClient.fetch(requestInstance);
      const response = await request.json();

      if (response?.error) {
        let message = `OAuth error: ${response.error}`;

        if (response?.error_description) {
          message += ` | ${response.error_description}`;
        }

        throw new AppError({
          name: 'TOKEN_REQUEST_ERROR',
          message,
        });
      } else if (request.status === 401) {
        throw new AppError({
          name: 'TOKEN_REQUEST_CREDENTIALS_ERROR',
          message: `OAuth received error. Check your clientId or clientSecret`,
        });
      }

      return this.getTokensFromResponse(response);
    } catch (error) {
      const message = error instanceof Error ? error.message : `Couldn't send request to service`;

      throw new AppError({
        name: 'TOKEN_REQUEST_UNKNOWN_ERROR',
        message,
      });
    }
  }
}

export const getBasicAuthToken = (clientId: string, clientSecret: string): string => {
  return btoa(clientId + ':' + clientSecret);
};

export const getCodeFromURL = (url: URL | string): string | null => {
  const params = resolveUrl(url).searchParams;

  return params.get('code');
};

export const getTokensFromResponse = (response: OAuthRequestTokenResponse): OAuthTokens => {
  return {
    accessToken: response.access_token,
    tokenType: response.token_type,
    expiresIn: response.expires_in,
    refreshToken: response.refresh_token,
    dateOfLastRequest: Date.now(), // @TODO: remove side effect?
  };
};

export const generateCodeVerifier = (): string => {
  const randomValue = generateRandomValue(CODE_VERIFIER_LENGTH);

  return base64urlencode(randomValue);
};

export const generateCodeChallenge = async (
  codeVerifier: string,
  codeChallengeMethod: CodeChallengeMethodType = 'S256'
): Promise<OAuthCodeChallengeStruct> => {
  try {
    const hashedVerifier = await hash(codeVerifier);

    const codeChallenge = base64urlencode(hashedVerifier);

    return {
      codeChallenge,
      codeChallengeMethod,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error?.message : `Couldn't generate code challenge, please check error cause`;

    throw new AppError({
      name: 'CODE_CHALLENGE_FAILED',
      message,
      cause: error,
    });
  }
};

export const validateResponse = (url: URL | string, options?: OAuthValidationParameters): boolean => {
  const params = resolveUrl(url).searchParams;
  const error = params.get('error');
  const errorDescription = params.get('error_description');
  const state = params.get('state');
  const code = params.get('code');

  if (error) {
    debug({
      name: 'RESPONSE_ERROR',
      message: errorDescription || 'Undefined response error',
    });

    return false;
  }

  if (code === null) {
    debug({
      name: 'CODE_NOT_FOUND',
      message: `Couldn't find 'code' in received url`,
    });

    return false;
  }

  if (state !== null) {
    if (options?.state === undefined) {
      debug({
        name: 'STATE_NOT_FOUND',
        message: `Received 'state' in response but I wasn't able to read 'state' from options parameter`,
      });

      return false;
    }

    if (options?.state !== state) {
      debug({
        name: 'STATE_MISMATCH',
        message: `State parameter from response didn't match the 'state' passed in options parameter`,
      });

      return false;
    }
  }

  return true;
};
