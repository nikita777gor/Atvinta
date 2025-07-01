import {defineStore} from "pinia";

import {ref, reactive} from "vue";
import type {IMarketComponent} from "@/types/components.types.ts";
import { MarketService } from "@/services/market.service";

import {STATIC_URL} from "@/const/api/apiUrl.const.ts";


export const useMarketStore = defineStore('MarketStore', () => {

  const marketData = ref<IMarketComponent[]>([]);

  const getMarket = async () => {
    try{
      const {data} = await MarketService.getMarket();
      marketData.value = data.data;

    }catch(err){
      console.log(err);
    }
  }


  return {
    marketData,

    getMarket,
  }

})
