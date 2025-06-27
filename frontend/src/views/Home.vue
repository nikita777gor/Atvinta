<script setup lang="ts">

import Header from "@/components/ui/Header.vue";
import Info from "@/components/info/Info.vue";
import Wallet from "@/components/wallet/Wallet.vue";
import Market from "@/components/market/Market.vue";
import Storage from "@/components/storage/Storage.vue";
import Production from "@/components/production/Production.vue";

import {onMounted} from "vue";

import {usePreloaderStore} from "@/stores/PreloaderStore.ts";
import {useComponentsStore} from "@/stores/ComponentsStore.ts";
import {useUserStore} from "@/stores/UserStore.ts";


const preloaderStore = usePreloaderStore();
const componentsStore = useComponentsStore();
const userStore = useUserStore();

onMounted(() => {
  preloaderStore.changePreloaderStatus(componentsStore.getMarketComponents().then(() => {
    userStore.getUserData()
  }));
})

</script>

<template>
  <div class="background">
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
