<script setup lang="ts">
//
</script>

<template>
  <div>
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
