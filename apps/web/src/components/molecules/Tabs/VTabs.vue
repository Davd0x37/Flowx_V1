<template>
  <div>
    <nav class="flex justify-center space-x-6 border-b border-neutral-200 dark:border-neutral-700">
      <button
        v-for="(tab, idx) in tabs"
        :key="idx"
        type="button"
        class="transition-color transition-background whitespace-nowrap border-b border-transparent p-3 text-sm font-semibold text-neutral-600 hover:border-green-500 hover:text-green-500 dark:text-neutral-400 [&.active]:border-green-500 [&.active]:text-green-500"
        @click="() => activateTab({ id: tab.id })"
      >
        {{ tab.name }}
      </button>
    </nav>
    <div class="container mt-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide } from 'vue';
import { useTabs } from './Tabs.composable';
import { activeTabSymbol, addTabSymbol } from './Tabs.symbol';
import type { ActiveTabRef, AddTabFunction, TabId } from './Tabs.type';

const { tabs, activeTab, addTab } = useTabs();

const activateTab = ({ id }: { id: TabId }) => {
  if (tabs.value.find((tab) => tab.id === id)) {
    activeTab.value = id;
  }
};

const activateFirstTab = () => {
  const firstTab = tabs.value?.[0];
  if (typeof firstTab === 'undefined') return;

  const id = firstTab.id;

  activateTab({ id });
};

onMounted(() => {
  activateFirstTab();
});

provide<AddTabFunction>(addTabSymbol, addTab);
provide<ActiveTabRef>(activeTabSymbol, activeTab);
</script>
