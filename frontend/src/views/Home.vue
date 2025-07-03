<script setup lang="ts">

import Header from "@/components/ui/Header.vue";
import Info from "@/components/info/Info.vue";
import Wallet from "@/components/wallet/Wallet.vue";
import Market from "@/components/market/Market.vue";
import Storage from "@/components/storage/Storage.vue";
import Production from "@/components/production/Production.vue";

import {onMounted} from "vue";

import {usePreloaderStore} from "@/stores/PreloaderStore.ts";
import {useMarketStore} from "@/stores/MarketStore.ts";
import {useUserStore} from "@/stores/UserStore.ts";
import {useProductionStore} from "@/stores/ProductionStore.ts";


const preloaderStore = usePreloaderStore();
const marketStore = useMarketStore();
const userStore = useUserStore();
const productionStore = useProductionStore();

const preloaderQuery = async () => {
  await userStore.getUserData();
  await marketStore.getMarket()
}

onMounted(() => {
  preloaderStore.changePreloaderStatus(preloaderQuery());
})

</script>

<template>
  <div v-if="!preloaderStore.preloaderStatus">
    <div class="container">
      <Header/>
      <Info/>
      <Wallet/>
      <Market/>
      <Storage/>
      <Production/>

    </div>
  </div>
</template>

<style lang="scss" scoped>


</style>
