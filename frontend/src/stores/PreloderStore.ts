import {defineStore} from "pinia";

import {ref} from "vue";

export const usePreloaderStore = defineStore('PreloaderStore', () => {

  const preloaderStatus = ref<boolean>(false);

  const changePreloaderStatus = (...promises) => {
    preloaderStatus.value = false;
    Promise.allSettled(promises).then(() => {
      preloaderStatus.value = true;
    })
  }

  return {
    preloaderStatus,
    changePreloaderStatus
  }

})
