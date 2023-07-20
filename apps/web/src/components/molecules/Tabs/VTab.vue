<template>
  <div :id="computedId" v-show="isActiveTab">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted } from 'vue';
import { activeTabSymbol, addTabSymbol } from './Tabs.symbol';

const props = defineProps<{
  name: string;
}>();



const activeTab = inject(activeTabSymbol);
const addTab = inject(addTabSymbol);
const computedId = computed(() => props.name);

const isActiveTab = computed(() => {
  return activeTab?.value == computedId.value;
});

onMounted(() => {
  if (addTab) {
    addTab({
      name: props.name,
      id: computedId.value,
    });
  }
});
</script>
