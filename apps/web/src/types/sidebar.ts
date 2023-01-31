import { RouteRecordName } from 'vue-router';

export interface PlusAction {
  icon: string;
  pathName: string;
}

export interface Actions {
  icon: string;
  path: {
    name: RouteRecordName | string;
  };
}

export interface SidebarPath {
  title: string;
  icon: string;
  color?: string;
  path: {
    name: RouteRecordName | string;
    params?: Record<string, unknown>;
  };
  children?: SidebarPath[];
  actions?: Actions;
}
