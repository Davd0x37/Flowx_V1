import { Notification } from './notification';
import { Service } from './service';

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
