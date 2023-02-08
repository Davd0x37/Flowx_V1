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

export type Selector = Record<string, string> | Record<string, string>[];

export type NotificationMode = 'success' | 'info' | 'warning' | 'error';
