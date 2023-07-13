<script setup lang="ts">
//
</script>

<template>
  <div
    class="m-0 h-full min-h-screen w-screen bg-gray-200 p-0 font-sans text-base text-neutral-100 antialiased transition-colors"
  >
    <p>
      <router-link to="/">Go to Home</router-link>
      <router-link to="/about">Go to About</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<style scoped>
/* Base styles - tailwind etc. */
@import './assets/base.css';
</style>
