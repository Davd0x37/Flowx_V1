<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { storeToRefs } from 'pinia';

import routes from '../routes';
import { useUserStore } from '../store';

const userStore = useUserStore();
const { userName } = storeToRefs(userStore);

const router = useRouter();

router.addRoute(routes.name!, routes);

onMounted(() => {
  router.addRoute(routes.name!, routes);
  setTimeout(() => {
    userStore.changeUserName('omosdmoasdoamsdo');
  }, 15000);
});
</script>

<template>
  <div className="relative">
    {{ userName }}
    <router-view></router-view>
  </div>
</template>
