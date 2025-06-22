import {defineStore} from "pinia";
import {ref} from "vue";

export const useCoinsStore = defineStore('coinsStore', () => {

  // Максимальное допустимое количество монет
  const maxCoinsCount:number = 100;

  const coinsCount:number = ref(0);

  const changeCoinsCount = (count:number):void => {
    console.log('click')
    if(coinsCount.value + count < 0) return;
    if(coinsCount.value + count > maxCoinsCount){
      coinsCount.value = maxCoinsCount;
      return;
    }
    coinsCount.value += count;
  }

  return {
    maxCoinsCount,
    coinsCount,
    changeCoinsCount
  }

})
