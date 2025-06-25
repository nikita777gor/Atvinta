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

//Миксин смещения монет и их переноса на другую строчку в зависимости от размеров экрана
@mixin coin-position($container, $i){
  $coinWidth: 8;
  $containerValue: $container / 1px;
  $left: ($i * $coinWidth) - $coinWidth;
  @if $left >= $containerValue{
    //Приравнивание container, чтобы оно делилось на ширину коина без остатка(позволяет сделать корректный отступ с новой строки)
    $multipleContainer: ceil($containerValue / $coinWidth) * $coinWidth;

    left: #{$left - floor($left / $multipleContainer) * $multipleContainer}px;
    top: #{floor($left / $containerValue) * 28}px
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
        @each $screen, $container in $containersMap {
          @if($screen == 'max'){
            @include coin-position($container, $i);
          }@else{
            @media (max-width: #{$screen}) {
              @include coin-position($container, $i);
            }
          }
        }


      }
    }
  }
}

</style>
