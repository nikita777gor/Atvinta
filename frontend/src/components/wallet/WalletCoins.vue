<script setup lang="ts">

import WalletCoinsItem from "@/components/wallet/WalletCoinsItem.vue";

import {useCoinsStore} from "@/stores/CoinsStore.ts";
import {computed} from "vue";

const coinsStore = useCoinsStore();


</script>

<template>

  <div class="wallet-coins">
    <div class="wallet-coins-wrapper">
      <WalletCoinsItem v-for="coin in coinsStore.coinsCount" :count="coinsStore.coinsCount" :key="coin"
                         :class="'wallet-coins-item-' + coin"/>
    </div>
  </div>

</template>

<style scoped lang="scss">

@import '@/assets/scss/main.scss';


//Миксин смещения монет и их переноса на другую строчку в зависимости от размеров экрана
@mixin coin-position($container, $i){
  $left: ($i * 8) - 8;
  @if $left >= $container{
    left: #{$left - floor($left / $container) * $container}px;
    top: #{floor($left / $container) * 28}px
  }@else{
    left: #{$left}px;
  }
}

.wallet-coins{
  margin-bottom: 20px;
  height: 40px;
  @media(max-width: $screen-lg){
    height: 60px;
  }
  &-wrapper{
    position: relative;
  }
  &-count{
    margin-bottom: 30px;
  }
  &-item{
    position: absolute;
    height: 20px;


    //Перебор монет и обращение к миксину смещения в зависимости от размеров экрана
    @for $i from 1 through 100{
      &-#{$i}{
        @include coin-position($container-max, $i);
        @media(max-width: $screen-2xl){
          @include coin-position($container-2xl, $i);
        }
        @media(max-width: $screen-xl){
          @include coin-position($container-xl, $i);
        }
        @media(max-width: $screen-lg){
          @include coin-position($container-lg, $i);
        }
      }
    }
  }
}

</style>
