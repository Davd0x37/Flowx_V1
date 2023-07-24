<script setup lang="ts">
import { VHeader } from 'app/components';
</script>

<template>
  <div
    class="grid h-full min-h-screen w-screen auto-rows-min gap-6 bg-zinc-100 p-4 font-sans text-base text-neutral-900 antialiased transition-colors dark:bg-zinc-900 dark:text-neutral-100"
  >
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>
