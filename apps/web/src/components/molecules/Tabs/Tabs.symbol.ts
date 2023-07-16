import type { InjectionKey } from 'vue';
import type { ActiveTabRef, AddTabFunction } from './Tabs.type';

export const addTabSymbol: InjectionKey<AddTabFunction> = Symbol('AddTab');
export const activeTabSymbol: InjectionKey<ActiveTabRef> = Symbol('ActiveTab');
