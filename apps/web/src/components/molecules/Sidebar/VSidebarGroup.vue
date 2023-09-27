<script setup lang="ts">
import { Icon, IconProps } from '@iconify/vue';
import { ChevronDown } from 'app/assets/icons';

defineProps<{
  icon?: string;
  title: string;
  iconSettings?: Omit<IconProps, 'icon'>;
}>();
</script>

<template>
  <details class="group [&_summary::-webkit-details-marker]:hidden">
    <summary
      class="group box-border flex h-10 items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
    >
      <div class="flex items-center gap-2">
        <Icon v-if="icon" :icon="icon" width="24" v-bind="iconSettings" />

        <span class="text-sm font-medium">{{ title }}</span>
      </div>

      <span class="shrink-0 transition duration-300 group-open:-rotate-180">
        <Icon :icon="ChevronDown" width="24" />
      </span>
    </summary>

    <div class="mt-2 space-y-2 pl-4">
      <slot></slot>
    </div>
  </details>
</template>
