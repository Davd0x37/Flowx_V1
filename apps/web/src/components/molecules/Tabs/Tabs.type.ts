import type { Ref } from 'vue';

export type TabId = string;

export interface Tab {
  name: string;
  id: TabId;
}

export type AddTabFunction = (tab: Tab) => void;
export type ActiveTabRef = Ref<TabId | null>;
