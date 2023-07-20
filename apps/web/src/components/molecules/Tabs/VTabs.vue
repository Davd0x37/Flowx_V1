<template>
  <div>
    <nav
      :class="['flex space-x-6 border-b border-neutral-300 dark:border-neutral-700', { 'justify-center': centered }]"
    >
      <button
        v-for="({ id, name }, idx) in tabs"
        :key="idx"
        type="button"
        :class="[
          'transition-color transition-background whitespace-nowrap border-b border-transparent p-3 text-sm font-semibold text-neutral-600 hover:border-green-500 hover:text-green-500 dark:text-neutral-400 [&.active]:border-green-500 [&.active]:text-green-500',
          { active: id === activeTab },
        ]"
        @click="() => setActiveTab(id)"
      >
        {{ name }}
      </button>
    </nav>
    <div class="container mt-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide } from 'vue';
import { TabsComposable, tabsComposableSymbol, useTabs } from 'app/composables/useTabs';

withDefaults(
  defineProps<{
    centered: boolean;
  }>(),
  {
    centered: false,
  }
);

const tabsComposable = useTabs();
const { activateFirstTab, setActiveTab, tabs, activeTab } = tabsComposable;

onMounted(() => {
  activateFirstTab();
});

provide<TabsComposable>(tabsComposableSymbol, tabsComposable);
</script>
