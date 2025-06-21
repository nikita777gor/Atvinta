<script setup lang="ts">

import Header from "@/components/ui/Header.vue";
import Info from "@/components/info/Info.vue";
import Wallet from "@/components/wallet/Wallet.vue";
import Market from "@/components/market/Market.vue";
import Storage from "@/components/storage/Storage.vue";
import Production from "@/components/production/Production.vue";
import RadioButton from "@/components/ui/RadioButton.vue";
import Checkbox from "@/components/ui/Checkbox.vue";

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

      <RadioButton group="type">
        <p class="second-text">Frontend</p>
      </RadioButton>
      <RadioButton group="type">
        <p class="second-text">Frontend</p>
      </RadioButton>

      <Checkbox>
        <p class="second-text">По 5 монет</p>
      </Checkbox>

    </div>
  </div>
</template>

<style lang="scss" scoped>




</style>
