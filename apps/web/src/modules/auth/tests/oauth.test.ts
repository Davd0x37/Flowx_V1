import { AppError, IV_LEN } from '@/helpers';
import { Fetch } from '@/lib/fetch';
import { describe, expect, test } from '@jest/globals';

import { OAuthBaseAuthenticator } from '../oauth';
import { OAuthAuthorizeParameters, OAuthSettings } from '../types';

jest.mock('../lib/fetch', () => ({
  Fetch: {
    fetch: jest.fn(async (d) => {
      return d;
    }),
  },
}));

const serviceOptions: OAuthSettings = {
  server: 'https://service.com',
  clientId: 'dGVzdCB0ZXN0IHRlc3Rz',
  clientSecret: 'MDEyMzQ1Njc4OTEwMTExMjEzMTQxNTE2',
  authorizationEndpoint: '/authorize',
  tokenEndpoint: '/api/token',
  discoveryEndpoint: '/.well-known/openid-configuration',
};

const authOptions: OAuthAuthorizeParameters = {
  redirectUri: 'https://local.app/authorize',
  responseType: 'code',
  scope: ['user', 'email'],
};

const auth = new OAuthBaseAuthenticator(serviceOptions, Fetch);

describe('Test OAuth service', () => {
  test('generate code verifier', () => {
    const code = auth.generateCodeVerifier();

    expect(typeof code).toBe('string');
    expect(code.length).toBeGreaterThanOrEqual(IV_LEN);
  });

  test('generate PKCE code challenge', async () => {
    expect.assertions(4);

    const code = auth.generateCodeVerifier();
    const challenge = await auth.generateCodeChallenge(code);

    expect(challenge).toHaveProperty('codeChallengeMethod');
    expect(challenge?.codeChallengeMethod).toBe('S256');
    expect(challenge).toHaveProperty('codeChallenge');
    expect(typeof challenge?.codeChallenge).toBe('string');
  });

  test('fail generating PKCE code challenge', async () => {
    expect.assertions(4);

    try {
      await auth.generateCodeChallenge(null as any);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('message');
      expect(error).toHaveProperty('name');
      expect(error.name).toBe('CODE_CHALLENGE_FAILED');
    }
  });

  describe('generate authorization URL', () => {
    test('with PKCE - default values', async () => {
      expect.assertions(1);

      const codeVerifier = auth.generateCodeVerifier();
      const { codeChallenge, codeChallengeMethod } = await auth.generateCodeChallenge(codeVerifier);

      const url = auth.getAuthorizeURL({
        ...authOptions,
        codeChallenge,
        codeChallengeMethod,
      });

      expect(typeof url).toBe('string');
    });
    test('without PKCE - default values', async () => {
      expect.assertions(1);

      const url = auth.getAuthorizeURL(authOptions);

      expect(typeof url).toBe('string');
    });
  });
});

export {};
