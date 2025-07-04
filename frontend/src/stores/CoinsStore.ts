import {defineStore} from "pinia";
import {ref} from "vue";

import {CoinsService} from "@/services/coins.service.ts";

import {useWindowStore} from "@/stores/WindowStore.ts";


export const useCoinsStore = defineStore('coinsStore', () => {

  const windowStore = useWindowStore();

  // Максимальное допустимое количество монет
  const maxCoinsCount:number = 100;

  const coinsCount = ref<number>(0);
  const newCoinsCount = ref<number>(0);



  let farmCoinsTimeOut: number;

  const changeCoinsCount = async (count:number):Promise<void> => {
    try{
      if(farmCoinsTimeOut){
        clearTimeout(farmCoinsTimeOut);
      }

      await increaseCoinsCount(count);
      newCoinsCount.value += count;

      farmCoinsTimeOut = setTimeout(async () => {
        const queryCoinsCount = newCoinsCount.value;
        newCoinsCount.value = 0;
        const coins = await CoinsService.changeCoinsCount(queryCoinsCount);
        console.log(coins);

      }, 600)
    }catch(err){
      console.log(err);
    }
  }

  const increaseCoinsCount = async (count:number) => {
    if(coinsCount.value + count > maxCoinsCount){
      windowStore.showWindow({
        img: '/icons/coin.png',
        title: 'Количество монет ограничено',
        description: 'Вы не можете нацыганить более 100 монет biorobo'
      })
      if(newCoinsCount.value){
        clearTimeout(farmCoinsTimeOut);
        const {data} = await CoinsService.changeCoinsCount(newCoinsCount.value);
        console.log(data);
        newCoinsCount.value = 0;
      }
      throw new Error('Количество монет ограничено')
    }
    coinsCount.value += count;

  }

  const decreaseCoinsCount = async (count:number) => {
    if(coinsCount.value - count < 0) throw new Error('Не хватает монет');
    coinsCount.value -= count;
  }






  return {
    maxCoinsCount,
    coinsCount,

    changeCoinsCount,
    increaseCoinsCount,
    decreaseCoinsCount

  }

})
