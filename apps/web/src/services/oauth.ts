import {
  CodeChallengeMethodType,
  GrantType,
  OAuthAccessTokenRequest,
  OAuthAccessTokenRequestPKCE,
  OAuthAuthorizeParameters,
  OAuthCodeChallengeStruct,
  OAuthRefreshTokensRequestPKCE,
  OAuthRequestTokenResponse,
  OAuthSettings,
  OAuthTokenRequest,
  OAuthTokens,
  OAuthValidationParameters,
} from '../Types';
import { CODE_VERIFIER_LENGTH, debug } from '../helpers';
import { base64urlencode } from '../utils';
import { AppError } from '../utils/error';
import { resolveUrl } from '../utils/network.util';
import { generateRandomValue, hash } from './crypto';
import { RequestBuilder, URLBuilder } from './request.builder';

function createBasicAuth(clientId: string, clientSecret: string): string {
  return btoa(clientId + ':' + clientSecret);
}

// function resolveEndpoint(apiPath: string, server: string | URL): string | null {}

// export async function generateServerConfig(options: OAuthSettings): Promise<OAuthSettings | null> {}

/**
 * Generate authentication URI from passed configuration
 *
 * @param {OAuthAuthorizeParameters} options
 * @returns {string} generated authorization URL
 */
export function generateAuthorizeUri(options: OAuthAuthorizeParameters): string {
  const urlBuilder = new URLBuilder(options.server);

  const scope = Array.isArray(options.scope) ? options.scope.join(' ') : options.scope;

  urlBuilder.addParameter({
    client_id: options.clientId,
    response_type: options.responseType,
    redirect_uri: options.redirectUri,
    scope,
  });

  if (options?.showDialog) {
    urlBuilder.addParameter({
      show_dialog: options.showDialog + '', // URLSearchParams accepts only string as value
    });
  }

  if (options?.state) {
    urlBuilder.addParameter({
      state: options.state,
    });
  }

  if (options?.codeChallengeMethod && options?.codeChallenge) {
    urlBuilder.addParameter({
      code_challenge: options.codeChallenge,
      code_challenge_method: options.codeChallengeMethod,
    });
  }

  return urlBuilder.toString();
}

function getTokenRequestURL(
  endpointUri: string | URL,
  options: OAuthAccessTokenRequestPKCE | OAuthRefreshTokensRequestPKCE
): URLBuilder {
  const urlBuilder = new URLBuilder(endpointUri);

  switch (options.grantType) {
    case 'authorization_code': {
      urlBuilder.addParameter({
        grant_type: options.grantType,
        code: options.code,
        redirect_uri: options.redirectUri,
        client_id: options.clientId,
        code_verifier: options.codeVerifier,
      });

      break;
    }
    case 'refresh_token': {
      urlBuilder.addParameter({
        grant_type: options.grantType,
        refresh_token: options.refreshToken,
        client_id: options.clientId,
      });
      break;
    }
    default: {
    }
  }

  return urlBuilder;
}

function getRefreshTokenRequestURL(endpointUri: string | URL, options: OAuthRefreshTokensRequestPKCE): URLBuilder {
  const urlBuilder = new URLBuilder(endpointUri);

  urlBuilder.addParameter({
    grant_type: options.grantType,
    client_id: options.clientId,
    refresh_token: options.refreshToken,
  });

  return urlBuilder;
}

// Run validateAuthorizationResponse before
export function getCodeFromURL(url: string | URL): string | null {
  const params = resolveUrl(url).searchParams;

  return params.get('code');
}

export function getTokensFromResponse(response: OAuthRequestTokenResponse): OAuthTokens {
  return {
    accessToken: response.access_token,
    tokenType: response.token_type,
    expiresIn: response.expires_in,
    refreshToken: response.refresh_token,
    dateOfLastRequest: Date.now(), // @TODO: remove side effect?
  };
}

export function generateCodeVerifier(): string {
  const randomValue = generateRandomValue(CODE_VERIFIER_LENGTH);

  return base64urlencode(randomValue);
}

export async function getCodeChallenge(
  codeVerifier: string,
  codeChallengeMethod: CodeChallengeMethodType = 'S256'
): Promise<OAuthCodeChallengeStruct | null> {
  try {
    const hashedVerifier = await hash(codeVerifier);

    const codeChallenge = base64urlencode(hashedVerifier);

    return {
      codeChallenge,
      codeChallengeMethod,
    };
  } catch (error) {
    debug({
      name: 'CODE_CHALLENGE_FAILED',
      message: `Couldn't generate code challenge, please check error cause`,
    });

    return null;
  }
}

// Heavily inspired from https://github.com/badgateway/oauth2-client
// I think this is the most beautiful and simplest form of response validation I've ever seen
// Perfection
export function validateAuthorizationResponse(url: string | URL, options?: OAuthValidationParameters): boolean {
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
}

export async function requestTokens(
  server: string,
  endpoint: string,
  options: OAuthAccessTokenRequestPKCE
): Promise<OAuthTokens> {
  const endpointUri = resolveUrl(endpoint, server);

  const requestTokenURL = getRequestTokenURL(endpointUri, options);
  const basicAuth = createBasicAuth(options.clientId, options.clientSecret);
  const queryStringBody = requestTokenURL.getSearchParams().toString();

  const requestBuilder = new RequestBuilder(endpointUri, {
    method: 'POST',
    body: queryStringBody,
  });

  requestBuilder.addHeaders({
    Authorization: `Basic ${basicAuth}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  const requestInstance = requestBuilder.getRequest();

  try {
    const request = await fetch(requestInstance);
    const response = await request.json();

    if (response?.error) {
      let message = `OAuth error: ${response.error}`;

      if (response?.error_description) {
        message += ` | ${response.error_description}`;
      }

      throw new AppError({
        name: 'REQUEST_ERROR',
        message,
      });
    } else if (request.status === 401) {
      throw new AppError({
        name: 'REQUEST_ERROR',
        message: `OAuth received error. Check your clientId or clientSecret`,
      });
    }

    return getTokensFromResponse(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : `Couldn't send request to service`;

    throw new AppError({
      name: 'REQUEST_ERROR',
      message,
      cause: error,
    });
  }
}

// // @TODO: maybe move sending post to other place?
// public async requestTokens(
//   parameters: Record<string, unknown>
// ): Promise<OAuthTokens & Pick<AuthParameters, 'scope'>> {
//   try {
//     const { tokenEndpointUri } = this.credentials;

//     const requestService = new RequestService(tokenEndpointUri);
//     const receivedTokens = await requestService.post<Record<string, string>>(parameters);

//     const receivedTokensTime = Date.now();

//     return {
//       accessToken: receivedTokens.access_token,
//       tokenType: receivedTokens.token_type,
//       scope: receivedTokens.scope,
//       expiresIn: receivedTokens.expires_in,
//       refreshToken: receivedTokens.refresh_token,
//       receivedTokensTime,
//     };
//   } catch (error) {
//     debug('[OAuthStrategy]')(`RequestTokens: ${error}`);

//     throw new Error('[OAuthStrategy] RequestTokens');
//   }
// }
