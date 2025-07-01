import {defineStore} from "pinia";
import {ref} from "vue";

import type {IWindowData} from "@/types/windowData.types.ts";


export const useWindowStore = defineStore('WindowStore', () => {

  const windowStatus = ref<boolean>(false);
  const windowData = ref<IWindowData>()

  const showWindow = (data: IWindowData) => {
    windowStatus.value = true;
    windowData.value = data;
    document.body.style.overflow="hidden";
  }

  const hideWindow = () => {
    windowStatus.value = false;
    document.body.style.overflow="auto";
  }


  return {
    windowStatus,
    windowData,
    showWindow,
    hideWindow
  }

})
