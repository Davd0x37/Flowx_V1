<script setup lang="ts">
import { Auth, Home } from 'app/assets/icons';
import { VLink } from 'app/components';
</script>

<template>
  <div class="flex gap-6">
    <VLink title="Home" :icon="Home" :to="{ name: 'home' }" />
    <VLink title="Auth" :icon="Auth" :to="{ name: 'authenticate' }" />
  </div>
</template>
