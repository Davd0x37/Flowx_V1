// #############################
// 				  INTERFACES
// #############################

export interface AuthParameters {
  // Authorization url
  authorizationUri: string;
  // Client ID
  clientId: string;
  // Client secret
  clientSecret: string;
  // Algorithm used to generate code challenge
  codeChallengeMethod: 'S256';
  // In order to generate the code challenge, your app should
  // hash the code verifier using the SHA256 algorithm - @Spotify
  codeChallenge: string;
  // Cryptographically random string between 43 and 128 characters in length - @Spotify
  codeVerifier: string;
  // Code received from service after authorization - used to exchange for access token
  code: string;
  // Information about what token we want from the service
  grantType: GrantTypeEnum;
  // Generated automatically
  redirectUri: string;
  // For now it's code because we use PKCE
  responseType: ResponseTypeEnum;
  // A space-separated list of scopes. - @Spotify
  // List of scopes from which we'll downloading our data
  scope: string;
  // Generated token/word/something that will be used to verify received tokens
  // from service
  state: string;
  // server Path where codes are exchanged for tokens
  tokenEndpointUri: string;
}

export interface TokenParameters {
  // Access token required to make server calls to service
  accessToken: string;
  // Bearer, Basic etc.
  tokenType: string;
  // Most services provide expires time in seconds
  expiresIn: string;
  // Token used to refresh access token
  refreshToken: string;
  // Time of recent request tokens
  receivedTokensTime: number;
}

// #############################
// 					 	ENUMS
// #############################

export enum ResponseTypeEnum {
  CODE = 'code',
}

export enum GrantTypeEnum {
  AUTHORIZATION = 'authorization_code',
  REFRESH_TOKEN = 'refresh_token',
}

export enum AuthenticationActionEnum {
  REQUEST_DATA = 0,
  REQUEST_TOKENS = 1,
  REFRESH_TOKENS = 2,
  AUTHENTICATE_SERVICE = 3,
}

// #############################
// 						TYPES
// #############################

export type AuthURI = Pick<
  AuthParameters,
  'clientId' | 'responseType' | 'redirectUri' | 'codeChallengeMethod' | 'codeChallenge'
> &
  Partial<Pick<AuthParameters, 'state' | 'scope'>>;

export type AuthURIGen = Pick<AuthParameters, 'authorizationUri' | 'codeVerifier' | 'codeChallenge'>;

export type POST = Partial<
  Pick<AuthParameters, 'clientId' | 'redirectUri' | 'grantType' | 'code' | 'codeVerifier'> &
    Pick<TokenParameters, 'refreshToken'>
>;

export type GET = Pick<TokenParameters, 'accessToken' | 'tokenType'>;

export type Tokens = Record<string, unknown>;
