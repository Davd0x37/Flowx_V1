// #############################
// 				  OAUTH
// #############################

export const IResponse = {
  CODE: 'code',
} as const;

export const IGrant = {
  AUTHORIZATION: 'authorization_code',
  REFRESH_TOKEN: 'refresh_token',
} as const;

export const IAuthenticationAction = {
  REQUEST_DATA: 'request_data',
  REQUEST_TOKENS: 'request_tokens',
  REFRESH_TOKENS: 'refresh_tokens',
  AUTHENTICATE_SERVICE: 'authenticate_service',
} as const;

export type ResponseType = keyof typeof IResponse;
export type GrantType = keyof typeof IGrant;
export type AuthenticationActionType = keyof typeof IAuthenticationAction;
export type CodeChallengeMethodType = 'S256' | 'plain';
export type OAuthEndpoints = 'tokenEndpoint' | 'authorizeEndpoint' | 'discoveryEndpoint';

export interface AuthSettings {
  /**
   * URL of OAuth2 server
   */
  server?: string;

  /**
   * OAuth2 client id - required to authenticate requests with your application
   */
  clientId: string;

  /**
   * OAuth2 secret code - required only for authorization code and client credentials
   */
  clientSecret?: string;

  /**
   * Required for authorization code flow - by default it is /authorize endpoint
   */
  authorizationEndpoint?: string;

  /**
   * Required endpoint for requesting and refreshing tokens
   */
  tokenEndpoint?: string;

  /**
   * OAuth2 discovery endpoint
   * For most services it is '.well-known/oauth-authorization-server'
   * Useful for discovering other endpoints if previous are not provided
   */
  discoveryEndpoint?: string;
}

export interface AuthorizeParameters {
  /**
   * URL of OAuth2 server
   */
  server: string;

  /**
   * OAuth2 client id - required to authenticate requests with your application
   */
  clientId: string;

  /**
   * Almost everywhere it is code for authorization code flow
   */
  responseType: ResponseType;

  /**
   * Selected page to redirect user after authentication
   */
  redirectUri: string;

  /**
   * Generated nonce that will be used to verify received tokens from service
   */
  state?: string;

  /**
   * List of required scopes to access data
   */
  scope: string | string[];

  /**
   * Default true for some services
   * show window authentication to user once again if this option is set to true
   */
  show_dialog?: boolean;

  /**
   * Algorithm used to generate code challenge
   */
  codeChallengeMethod?: CodeChallengeMethodType;

  /**
   * Generated code challenge using selected method
   */
  codeChallenge?: string;
}

export interface CodeChallengeStruct {
  method: CodeChallengeMethodType;

  codeChallenge: string;
}

export interface AuthorizeResponseValidationParameters {
  state?: string;
}

export interface AuthorizeResponseValidation {
  code: string;
}

export interface OAuthTokenRequest {
  clientId: string;
  clientSecret: string;
  grantType: GrantType;
  code: string;
  redirectUri: string;
  codeVerifier?: string;
  refreshToken?: string;
}

// // Cryptographically random string between 43 and 128 characters in length - @Spotify
// codeVerifier: string;
// // Code received from service after authorization - used to exchange for access token
// code: string;
// // Information about what token we want from the service
// grantType: GrantType;

export interface RequestTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

export interface OAuthTokens {
  // Access token required to make server calls to service
  accessToken: string;

  // Bearer, Basic etc.
  tokenType: string;

  // Most services provide expires time in seconds
  expiresIn: number;

  // Token used to refresh access token
  refreshToken: string;

  // Time of recent request tokens
  dateOfLastRequest: number;
}

export type RequestMethodTypes = 'POST' | 'GET' | 'UPDATE';

export interface FileReadHandlers {
  onload: (result: string, event: ProgressEvent<FileReader>) => void;
  onerror: (event: ProgressEvent<FileReader>) => void;
  onprogress: (event: ProgressEvent<FileReader>) => void;
  onabort: (event: ProgressEvent<FileReader>) => void;
}

export interface URLDownload {
  name: string;
  url: string;
}

export interface FileSchema {
  encryption: {
    salt: string;
  };
  data: string;
}

export interface IOnClick {
  onClick: (...args: unknown[]) => unknown;
}

export interface Notification {
  mode: NotificationMode;
  title: string;
  message: string;
}

export interface Service {
  // Service ID
  $id: string;
  // Service name
  name: string;
  // Service configuration - icon, colors etc.
  config: {
    // Icon name eg. lab la-brand
    icon: string;
    // Color used to print important labels
    color: string;
    // -------
    isEnabled: boolean;
  };
  auth: {
    hasRequestedTokens: boolean;
    credentials: Pick<AuthParameters, 'authorizationUri' | 'clientId' | 'clientSecret' | 'tokenEndpointUri' | 'scope'> &
      Partial<Pick<AuthParameters, 'redirectUri'>>;
    // Authentication tokens
    tokens: Tokens;
  };
  // Paths where runner should look for data and obtain selected
  dataPaths: DataPath[];
  // Received data from service
  data: Data[];
}

export interface DataPath {
  path: string;
  name?: string;
  select: Data[];
}

export interface Data {
  label: string; // Title
  detail: string; // Path
  isImportant: boolean; // Is important?
  isEnabled: boolean;
  matcher?: Record<string, string | number | boolean>;
  arrayLimit?: number; // Collected array limit
}

export interface RootState {
  name: string;
  darkMode: boolean;
  lang: string;
  isAuth: boolean;
  searchBox: string;
  encryption: {
    passwordHash: string;
    salt: string;
  };
}

export interface ServiceState {
  // Record< Service name, Service content >
  list: Record<string, Service>;
}

export interface NotificationState {
  list: Notification[];
}

export interface ConvertedStore {
  store: RootState;
  serviceStore: ServiceState;
}

// import { RouteRecordName } from 'vue-router';

// export interface PlusAction {
//   icon: string;
//   pathName: string;
// }

// export interface Actions {
//   icon: string;
//   path: {
//     name: RouteRecordName | string;
//   };
// }

// export interface SidebarPath {
//   title: string;
//   icon: string;
//   color?: string;
//   path: {
//     name: RouteRecordName | string;
//     params?: Record<string, unknown>;
//   };
//   children?: SidebarPath[];
//   actions?: Actions;
// }

export type NotificationMode = 'success' | 'info' | 'warning' | 'error';
