export type NotificationMode = 'success' | 'info' | 'warning' | 'error';

export interface Notification {
  mode: NotificationMode;
  title: string;
  message: string;
}
