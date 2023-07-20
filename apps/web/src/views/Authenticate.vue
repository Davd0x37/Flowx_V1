<script setup lang="ts">
import { UserInterface, UserRegisterInterface } from '@flowx/shared';
import { LoginForm, RegisterForm, VTab, VTabs } from 'app/components';

const handleLogin = (ev: UserInterface) => {
  console.log(ev);
};

const handleRegister = (ev: UserRegisterInterface) => {
  console.log(ev);
};
</script>

<template>
  <div className="relative">
    <div className="m-auto max-w-md rounded-md bg-neutral-200 dark:bg-neutral-800 drop-shadow-md p-5 ">
      <VTabs centered>
        <VTab name="Login">
          <LoginForm :onSubmit="handleLogin"></LoginForm>
        </VTab>
        <VTab name="Register">
          <RegisterForm :onSubmit="handleRegister"></RegisterForm>
        </VTab>
      </VTabs>
    </div>
  </div>
</template>
