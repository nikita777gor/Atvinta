<script setup lang="ts">

import MarketItem from "@/components/market/MarketItem.vue";

</script>

<template>
  <div class="market-list">
    <MarketItem/>
    <MarketItem/>
    <MarketItem/>
    <MarketItem/>
  </div>
</template>

<style scoped lang="scss">

@import "@/assets/scss/main.scss";

.market-list {
  @include components-list();
}

</style>
