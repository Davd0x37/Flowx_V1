import {
  CodeChallengeMethodType,
  OAuthAccessTokenRequestPKCE,
  OAuthAuthorizeParameters,
  OAuthCodeChallengeStruct,
  OAuthEndpoints,
  OAuthRefreshTokensRequestPKCE,
  OAuthRequestTokenResponse,
  OAuthSettings,
  OAuthTokens,
  OAuthValidationParameters,
} from '../Types';
import { CODE_VERIFIER_LENGTH, debug } from '../helpers';
import { base64urlencode } from '../utils';
import { resolveUrl } from '../utils/network.util';
import { generateRandomValue, hash } from './crypto';
import { RequestBuilder, URLBuilder } from './request.builder';

// https://github.com/panva/oauth4webapi/blob/main/src/index.ts

export class OAuthBaseAuthenticator {
  private settings: OAuthSettings;

  private defaultEndpoints: Record<OAuthEndpoints, string> = {
    authorizationEndpoint: '/authorize',
    tokenEndpoint: '/api/token',
    discoveryEndpoint: '/.well-known/oauth-authorization-server',
    // discoveryEndpoint: '/.well-known/openid-configuration',
  };

  constructor(settings: OAuthSettings) {
    this.settings = settings;

    if (!settings?.authorizationEndpoint && !settings.discoveryEndpoint) {
      this.discover();
    }
  }

  private getBasicAuthToken(): string | null {
    if (!this.settings?.clientSecret) return null;

    return btoa(this.settings.clientId + ':' + this.settings.clientSecret);
  }

  // Run validateAuthorizationResponse before
  public getCodeFromURL(url: URL | string): string | null {
    const params = resolveUrl(url).searchParams;

    return params.get('code');
  }

  public getTokensFromResponse(response: OAuthRequestTokenResponse): OAuthTokens {
    return {
      accessToken: response.access_token,
      tokenType: response.token_type,
      expiresIn: response.expires_in,
      refreshToken: response.refresh_token,
      dateOfLastRequest: Date.now(), // @TODO: remove side effect?
    };
  }

  public generateCodeVerifier(): string {
    const randomValue = generateRandomValue(CODE_VERIFIER_LENGTH);

    return base64urlencode(randomValue);
  }

  public async generatePKCECodeChallenge(
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

  private getEndpoint(endpoint: OAuthEndpoints): URL | string | null {
    const { server } = this.settings;

    if (endpoint in this.settings) {
      return resolveUrl(this.settings[endpoint]!, server);
    }

    if (endpoint in this.defaultEndpoints) {
      return resolveUrl(this.defaultEndpoints[endpoint]!, server);
    }

    return null;
  }

  /**
   * Generate authentication URI from passed configuration
   *
   * @param {OAuthAuthorizeParameters} options
   * @returns {string} generated authorization URL
   */
  public getAuthorizeURL(options: OAuthAuthorizeParameters): string | null {
    const scope = Array.isArray(options.scope) ? options.scope.join(' ') : options.scope;
    const { clientId } = this.settings;

    const endpoint = this.getEndpoint('authorizationEndpoint');
    if (endpoint === null) return null;

    const urlBuilder = new URLBuilder(endpoint, {
      client_id: clientId,
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

  public getTokenRequestURL(
    endpoint: URL | string,
    options: OAuthAccessTokenRequestPKCE | OAuthRefreshTokensRequestPKCE
  ): URLBuilder {
    const urlBuilder = new URLBuilder(endpoint, {
      client_id: this.settings.clientId,
    });

    switch (options.grantType) {
      case 'authorization_code': {
        urlBuilder.addParameter({
          grant_type: options.grantType,
          code: options.code,
          redirect_uri: options.redirectUri,
          code_verifier: options.codeVerifier,
        });

        break;
      }
      case 'refresh_token': {
        urlBuilder.addParameter({
          grant_type: options.grantType,
          refresh_token: options.refreshToken,
        });
        break;
      }
      default: {
      }
    }

    return urlBuilder;
  }

  public validateResponse(url: URL | string, options?: OAuthValidationParameters): boolean {
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

  private async discover() {
    const endpoint = this.getEndpoint('discoveryEndpoint');
    if (endpoint === null) return;

    console.log(endpoint.toString());

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        mode: 'no-cors',
      });
      console.log(response);

      if (!response.headers.get('Content-Type')?.startsWith('application/json')) {
        debug({
          name: 'DISCOVERY_CONTENT_TYPE_ERROR',
          message: `Received response was not JSON response`,
        });

        return;
      }

      const responseJson = await response.json();

      console.log(responseJson);
    } catch (error) {
      const message = error instanceof Error ? error.message : `OpenID discovery fetch failed`;

      debug({
        name: 'DISCOVERY_CONFIGURATION_ERROR',
        message,
      });
    }
  }

  public async accessToken(options: Omit<OAuthAccessTokenRequestPKCE, 'grantType'>): Promise<OAuthTokens | null> {
    return this.__request('tokenEndpoint', { ...options, grantType: 'authorization_code' });
  }

  public async refreshToken(options: Omit<OAuthRefreshTokensRequestPKCE, 'grantType'>): Promise<OAuthTokens | null> {
    return this.__request('tokenEndpoint', { ...options, grantType: 'refresh_token' });
  }

  private async __request(
    endpoint: OAuthEndpoints,
    // make union of possible options
    options: OAuthAccessTokenRequestPKCE | OAuthRefreshTokensRequestPKCE
  ): Promise<OAuthTokens | null> {
    const endpointUri = this.getEndpoint(endpoint);
    const basicAuth = this.getBasicAuthToken();

    if (endpointUri === null) {
      debug({
        name: 'ENDPOINT_CONFIGURATION_ERROR',
        message: `Provided invalid endpoint: ${endpoint}`,
      });

      return null;
    }

    if (basicAuth === null) {
      debug({
        name: 'BASIC_AUTH_CONFIGURATION_ERROR',
        message: `Client secret not provided`,
      });

      return null;
    }

    const requestTokenURL = this.getTokenRequestURL(endpointUri, options);
    const queryStringBody = requestTokenURL.getSearchParams().toString();

    const requestBuilder = new RequestBuilder(endpointUri, {
      method: 'POST',
      body: queryStringBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    requestBuilder.addHeaders({
      Authorization: `Basic ${basicAuth}`,
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

        debug({
          name: 'TOKEN_REQUEST_ERROR',
          message,
        });

        return null;
      } else if (request.status === 401) {
        debug({
          name: 'TOKEN_REQUEST_CREDENTIALS_ERROR',
          message: `OAuth received error. Check your clientId or clientSecret`,
        });

        return null;
      }

      return this.getTokensFromResponse(response);
    } catch (error) {
      const message = error instanceof Error ? error.message : `Couldn't send request to service`;

      debug({
        name: 'TOKEN_REQUEST_UNKNOWN_ERROR',
        message,
      });

      return null;
    }
  }
}
