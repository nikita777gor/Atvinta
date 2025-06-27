import {defineStore} from "pinia";

import {ref} from "vue";

export const usePreloaderStore = defineStore('PreloaderStore', () => {

  const preloaderStatus = ref<boolean>();

  const changePreloaderStatus = (promise:Promise<void>) => {
    preloaderStatus.value = true;
    promise.then(() => {
      preloaderStatus.value = false;
    })
  }

  return {
    preloaderStatus,
    changePreloaderStatus
  }

})
