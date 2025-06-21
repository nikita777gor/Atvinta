<script setup lang="ts">

import Header from "@/components/ui/Header.vue";
import Info from "@/components/info/Info.vue";
import Wallet from "@/components/wallet/Wallet.vue";
import Market from "@/components/market/Market.vue";
import Storage from "@/components/storage/Storage.vue";
import Production from "@/components/production/Production.vue";

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
