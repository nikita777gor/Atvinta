import {defineStore} from "pinia";
import {ref} from "vue";
import {UserService} from "@/services/user.service.ts";

import {useStorageStore} from "@/stores/StorageStore.ts";
import {useCoinsStore} from "@/stores/CoinsStore.ts";
import {useProductionStore} from "@/stores/ProductionStore.ts";

export const useUserStore = defineStore('UserStore', () => {

  const storageStore = useStorageStore();
  const coinsStore = useCoinsStore();
  const productionStore = useProductionStore();

  const userData = ref();

  const getUserData = async () => {
    try{
      const {data} = await UserService.getUser();
      console.log(data);
      storageStore.storageData = data.data.storage;
      coinsStore.coinsCount = data.data.coins;
      productionStore.productionRobotData = data.data.production.robot;
      productionStore.productionComponents = data.data.production.components;

    }catch(err){
      console.log(err);
    }
  }

  return {
    userData,
    getUserData
  }

})
