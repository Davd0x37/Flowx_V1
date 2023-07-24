<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';
import { Icon } from '@iconify/vue';

defineProps<{ icon: string; title: string; to: RouteLocationRaw }>();
</script>

<template>
  <router-link
    :to="to"
    class="after:content-[' '] relative flex place-items-center px-1 py-2 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:rounded after:transition-colors hover:text-green-500 after:hover:bg-green-500"
    ><Icon :icon="icon" class="mr-1 text-xl" />{{ title }}</router-link
  >
</template>
