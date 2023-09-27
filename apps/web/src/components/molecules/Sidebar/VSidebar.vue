<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { Home, Profile, Settings, VaultOpen } from 'app/assets/icons';
import { castVueRoutesToNestedObject } from 'app/common/routes';
import { VLink } from 'app/components';
import LinkGroup from './VSidebarGroup.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

let routes = castVueRoutesToNestedObject(router.getRoutes());
console.log(routes)
</script>

<template>
  <div class="border-e border-e-gray-700 bg-neutral-200 px-5 py-1 shadow-md dark:bg-neutral-900">
    <div class="space-y-2">
      <div>
        <VLink to="home" :icon="Home">{{ t('home.title') }}</VLink>
      </div>

      <div>
        <LinkGroup :title="t('user.title')" :icon="Profile">
          <VLink :to="{ name: 'user-authenticate' }" :icon="Home">{{ t('user.authenticate.title') }}</VLink>
          <VLink :to="{ name: 'user-details' }" :icon="Home">{{ t('user.title') }}</VLink>
          <VLink :to="{ name: 'user-settings' }" :icon="Home">{{ t('user.settings.title') }}</VLink>
        </LinkGroup>
      </div>

      <!-- <div>
        <VLink :to="{ name: 'services' }" :icon="VaultOpen">{{ t('services.title') }}</VLink>
      </div> -->

      <div>
        <VLink :to="{ name: 'home' }" :icon="Settings">{{ t('settings.title') }}</VLink>
      </div>
    </div>
  </div>
</template>
