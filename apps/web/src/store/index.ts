import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    theme: 'dark',
  }),
  getters: {
    theme(state) {
      return state.theme;
    },
  },
  actions: {
    changeTheme(val: string) {
      this.theme = val;
    },
  },
});
