import { Service } from '@/types/service';

import { dateExpired } from './utils';

export const tokensExpired = (receivedTokensTime: string, expiresIn: string): boolean => {
  if (receivedTokensTime) {
    const rTT = new Date(receivedTokensTime);
    const expiresInNum = Number(expiresIn);
    return dateExpired(rTT, expiresInNum);
  }

  return false;
};

export const hasTokens = (tokens: Service['auth']['tokens']): boolean => {
  let has = false;
  has = tokens.accessToken !== null;
  has = tokens.tokenType !== null;
  has = tokens.expiresIn !== null;
  has = tokens.refreshToken !== null;
  has = tokens.receivedTokensTime !== null;

  return has;
};
