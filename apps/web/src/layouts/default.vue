<template>
  <Header />
  <slot />
  <Footer />
</template>

<script setup lang="ts">
import Footer from './Footer/Footer.vue';
import Header from './Header/Header.vue';
</script>
