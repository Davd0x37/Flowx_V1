import { type Ref, ref } from 'vue';
import type { Tab, TabId } from './Tabs.type';

export const useTabs = () => {
  const tabs: Ref<Array<Tab>> = ref([]);
  const activeTab: Ref<TabId | null> = ref(null);

  const addTab = (tab: Tab) => {
    if (!tabs.value.find((extTab) => extTab.id === tab.id)) {
      tabs.value.push(tab);
    }
  };

  return {
    tabs,
    activeTab,
    addTab,
  };
};
