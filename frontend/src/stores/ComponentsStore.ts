import {defineStore} from "pinia";

import {ref} from "vue";
import type {IMarketComponent, IUserComponent} from "@/types/components.types.ts";
import {ComponentsService} from "@/services/components.service.ts";

export const useComponentsStore = defineStore('ComponentsStore', () => {

  const marketComponentsData = ref<IMarketComponent[]>([]);
  const userComponentsData = ref<IUserComponent[]>([]);

  const getMarketComponents = async () => {
    try{
      const {data} = await ComponentsService.getMarket();
      console.log(data);
    }catch(err){
      console.log(err);
    }
  }

  return {
    marketComponentsData,
    userComponentsData,

    getMarketComponents,
  }

})
