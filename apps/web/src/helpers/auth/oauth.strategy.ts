/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { hash } from '@/helpers/hash';
import { generateRandomString } from '@/helpers/random';
import { base64urlencode } from '@/helpers/utils';
import { AuthParameters, AuthURIGen, ResponseTypeEnum, TokenParameters } from '@/types/auth';
import { debug } from 'debug';
import qs from 'qs';

import { RequestService } from '../request.service';
import { AuthBaseStrategy } from './base.strategy';

export class OAuthStrategy extends AuthBaseStrategy {
  private credentials!: AuthParameters;

  public setCredentials(credentials: Partial<AuthParameters>): void {
    this.credentials = {
      ...this.credentials,
      ...credentials,
    };
  }

  public async setupAuthentication(): Promise<AuthURIGen> {
    const { authorizationUri, clientId, scope, redirectUri } = this.credentials;

    const codeVerifier = this.generateCodeVerifier();
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);
    const authorization = this.generateAuthenticationURI(authorizationUri, {
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      response_type: ResponseTypeEnum.CODE,
      // @TODO: Add state parameter
      // state
    });

    return {
      codeVerifier,
      codeChallenge,
      authorizationUri: authorization,
    };
  }

  // @TODO: maybe move sending post to other place?
  public async requestTokens(
    parameters: Record<string, unknown>
  ): Promise<TokenParameters & Pick<AuthParameters, 'scope'>> {
    try {
      const { tokenEndpointUri } = this.credentials;

      const requestService = new RequestService(tokenEndpointUri);
      const receivedTokens = await requestService.post<Record<string, string>>(parameters);

      const receivedTokensTime = Date.now();

      return {
        accessToken: receivedTokens.access_token,
        tokenType: receivedTokens.token_type,
        scope: receivedTokens.scope,
        expiresIn: receivedTokens.expires_in,
        refreshToken: receivedTokens.refresh_token,
        receivedTokensTime,
      };
    } catch (error) {
      debug('[OAuthStrategy]')(`RequestTokens: ${error}`);

      throw new Error('[OAuthStrategy] RequestTokens');
    }
  }

  public generateAuthenticationURI(url: string, params: Record<string, unknown>): string {
    const queryString = qs.stringify(params);

    return `${url}?${queryString}`;
  }

  public generateCodeVerifier(min = 43, max = 128): string {
    const randomLength = Math.floor(Math.random() * (max - min + 1)) + min;
    const array = generateRandomString(randomLength);

    return array;
  }

  public async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const hashedVerifier = await hash(codeVerifier);
    const encoded = base64urlencode(hashedVerifier);

    return encoded;
  }
}
