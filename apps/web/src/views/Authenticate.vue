<script setup lang="ts">
import { UserInterface } from '@flowx/shared';
import { LoginForm, VTab, VTabs } from 'app/components';

const handleSubmit = (ev: UserInterface) => {
  console.log(ev);
};
</script>

<template>
  <div className="relative">
    <div className="m-auto max-w-md rounded-md bg-neutral-200 dark:bg-neutral-800 drop-shadow-md p-5">
      <VTabs>
        <VTab name="Login">
          <LoginForm :onSubmit="handleSubmit"></LoginForm>
        </VTab>
        <VTab name="Register">
          <!-- <LoginForm :onSubmit="handleSubmit"></LoginForm> -->
        </VTab>
        <!-- </Tab> -->
        <!-- <Tab title="register"> -->
        <!-- <Register /> -->
        <!-- </Tab> -->
      </VTabs>
    </div>
  </div>
</template>
