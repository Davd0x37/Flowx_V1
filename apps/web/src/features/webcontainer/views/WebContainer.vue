<script setup lang="ts">
import { VNodeRef, onMounted, ref } from 'vue';
import { getWebCInstance, initWebContainer } from '../modules/webcontainer';

const iframeElement = ref<VNodeRef | null>(null);

onMounted(async () => {
  const webCInstance = await getWebCInstance();
  await initWebContainer(webCInstance, iframeElement.value);
});
</script>

<template>
  <div>
    <iframe ref="iframeElement" frameborder="0"></iframe>
  </div>
</template>
