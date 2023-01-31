import { AuthParameters } from '@/types/auth';
import { debug } from 'debug';

import { AuthBaseStrategy } from './base.strategy';

export class BasicStrategy extends AuthBaseStrategy {
  private credentials!: AuthParameters;

  public setCredentials(credentials: Partial<AuthParameters>): void {
    this.credentials = {
      ...this.credentials,
      ...credentials,
    };
  }

  public setupAuthentication(): unknown {
    debug('[BasicStrategy]')(`SetupAuthentication: not implemented`);

    return null;
  }

  // @TODO: maybe move sending post to other place?
  public requestTokens(): unknown {
    debug('[BasicStrategy]')(`RequestTokens: not implemented`);

    return null;
  }
}
