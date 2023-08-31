<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { UserInterface, UserRegisterInterface } from '@flowx/shared';
import { VLoginForm, VRegisterForm, VTab, VTabs } from 'app/components';

const { t } = useI18n();

const handleLogin = (ev: UserInterface) => {
  console.log(ev);
};

const handleRegister = (ev: UserRegisterInterface) => {
  console.log(ev);
};
</script>

<template>
  <div className="relative">
    <div className="m-auto max-w-md rounded-md bg-neutral-200 dark:bg-neutral-800 shadow-md p-5 pt-2 ">
      <VTabs centered>
        <VTab :name="t('authenticate.login')">
          <VLoginForm :onSubmit="handleLogin"></VLoginForm>
        </VTab>

        <VTab :name="t('authenticate.register')">
          <VRegisterForm :onSubmit="handleRegister"></VRegisterForm>
        </VTab>
      </VTabs>
    </div>
  </div>
</template>
