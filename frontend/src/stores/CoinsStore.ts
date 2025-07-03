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
      if(coinsCount.value + count > maxCoinsCount){
        windowStore.showWindow({
          img: '/icons/coin.png',
          title: 'Количество монет ограничено',
          description: 'Вы не можете нацыганить более 100 монет biorobo'
        })

        throw new Error('Количество монет ограничено')
      }
      coinsCount.value += count;
      newCoinsCount.value += count;


      // Сделать что если количество при клике выдает ошибку о переборе коинов отправлялся запрос на 5 коинов меньше

      farmCoinsTimeOut = setTimeout(async () => {
        console.log('NEW COINS: ' + newCoinsCount.value);
        const coins = await CoinsService.changeCoinsCount(newCoinsCount.value)
        newCoinsCount.value = 0;
        console.log(coins);
      }, 5000)
    }catch(err){
      console.log(err);
    }
  }

  // Методы по работе с коинами из вне

  const increaseCoinsCountSync = (count:number) => {

    console.log('BUY - NEW COINS: ' + newCoinsCount.value)
    // Отправка запроса на изменение монет в случае если таймаут по накликаным коинам не успеет уйти а пользователь будет взаиомдействовать с балансом
    if(newCoinsCount.value){
      clearTimeout(farmCoinsTimeOut);
      CoinsService.changeCoinsCount(newCoinsCount.value).then((data) => {
        newCoinsCount.value = 0;
        console.log(data);
      })

    }

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
