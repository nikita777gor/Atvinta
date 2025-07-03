import {defineStore} from "pinia";
import {ref} from "vue";

import type {IStorageComponent} from "@/types/components.types.ts";
import {StorageService} from "@/services/storage.service.ts";

import {useCoinsStore} from "@/stores/CoinsStore.ts";



export const useStorageStore = defineStore('StorageStore', () => {

  const coinsStore = useCoinsStore();

  const storageComponentAnimation = ref<'increment' | 'decrement'>('increment');
  const storageData = ref<IStorageComponent[]>([]);

  const buyStorageComponent = async (componentId: string, price: number) => {
    try{
      coinsStore.decreaseCoinsCountSync(price);
      changeStorageComponentCount(componentId, 1);
      const {data} = await StorageService.buyStorageComponent(componentId);
      console.log(data);
    }catch(err){
      console.log(err);
    }
  }

  const sellStorageComponent = async (componentId: string, price: number) => {
    try{
      coinsStore.increaseCoinsCountSync(price);
      changeStorageComponentCount(componentId, -1);
      const {data} = await StorageService.sellStorageComponent(componentId);
      console.log(data);
    }catch(err){
      console.log(err)
    }
  }


  const changeStorageComponentCount = (componentId: string, count: number) => {
    storageComponentAnimation.value = count > 0 ? 'increment' : 'decrement';
    const componentIndex = storageData.value.findIndex((component) => component._id === componentId);
    if(componentIndex === -1) return

    const component = storageData.value[componentIndex];

    if(component.count + count < 0){
      throw new Error('Не хватает количества комплектующих на складе');
    }
    storageData.value[componentIndex].count += count;

  }



  return {
    storageComponentAnimation,
    storageData,

    buyStorageComponent,
    sellStorageComponent,
    changeStorageComponentCount
  }
})
