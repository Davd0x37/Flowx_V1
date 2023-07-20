<script setup lang="ts">
import { VHeader } from 'app/components';

//
</script>

<template>
  <div
    class="m-0 h-full min-h-screen w-screen bg-zinc-100 p-4 font-sans text-base text-neutral-900 antialiased transition-colors dark:bg-zinc-900 dark:text-neutral-100"
  >
    <v-header></v-header>
    <p>
      <router-link :to="{ name: 'home' }">Go to Home</router-link>
      <router-link :to="{ name: 'authenticate' }">Go to About</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>
