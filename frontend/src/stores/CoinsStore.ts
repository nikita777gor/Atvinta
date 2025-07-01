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


  // Уменьшить количество запросов на сервер

  let farmCoinsTimeOut: number;

  const changeCoinsCount = async (count:number):Promise<void> => {
    try{
      if(farmCoinsTimeOut){
        clearTimeout(farmCoinsTimeOut);
      }

      increaseCoinsCountSync(count);

      newCoinsCount.value += count;

      // Сделать что если количество при клике выдает ошибку о переборе коинов отправлялся запрос на 5 коинов меньше

      farmCoinsTimeOut = setTimeout(async () => {
        console.log(newCoinsCount.value);
        const coins = await CoinsService.changeCoinsCount(newCoinsCount.value)
        console.log(coins);
        newCoinsCount.value = 0;

      }, 500)
    }catch(err){
      console.log(err);
    }
  }

  const increaseCoinsCountSync = (count:number) => {
    if(coinsCount.value + count > maxCoinsCount){
      windowStore.showWindow({
        img: '/icons/coin.png',
        title: 'Количество монет ограничено',
        description: 'Вы не можете нацыганить более 100 монет biorobo'
      })
      throw new Error('Количество монет ограничено')
    }
    coinsCount.value += count;
  }

  const decreaseCoinsCountSync = (count:number) => {
    if(coinsCount.value - count < 0) throw new Error('Не хватает монет');
    coinsCount.value -= count;
  }



  return {
    maxCoinsCount,
    coinsCount,

    changeCoinsCount,
    increaseCoinsCountSync,
    decreaseCoinsCountSync

  }

})
