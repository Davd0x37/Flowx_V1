<script setup lang="ts">
import { ref } from 'vue';
</script>

<template>
  <button
    className="rounded bg-emerald-600 p-2 px-4 py-2 text-sm font-medium text-emerald-50 transition hover:bg-emerald-700"
    type="button"
  >
    <slot />
  </button>
</template>
