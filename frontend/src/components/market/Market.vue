<script setup lang="ts">

import MarketList from "@/components/market/MarketList.vue";

import {useMarketStore} from "@/stores/MarketStore.ts";

const marketStore = useMarketStore();

</script>

<template>

  <div class="block">
    <div class="market">
      <h2 class="block-title">Рынок комплектующих</h2>
      <MarketList :marketData="marketStore.marketData"/>
    </div>
  </div>

</template>

<style scoped lang="scss">


</style>
