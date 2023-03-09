// import { Service } from '../Types';
// import { isDateExpired } from './time';

// export const tokensExpired = (receivedTokensTime: string, expiresIn: string): boolean => {
//   if (receivedTokensTime) {
//     const rTT = new Date(receivedTokensTime);
//     const expiresInNum = Number(expiresIn);
//     return isDateExpired(rTT, expiresInNum);
//   }

//   return false;
// };

// export const hasTokens = (tokens: Service['auth']['tokens']): boolean => {
//   let has = false;
//   has = tokens.accessToken !== null;
//   has = tokens.tokenType !== null;
//   has = tokens.expiresIn !== null;
//   has = tokens.refreshToken !== null;
//   has = tokens.receivedTokensTime !== null;

//   return has;
// };
