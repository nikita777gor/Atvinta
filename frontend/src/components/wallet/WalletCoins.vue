<script setup lang="ts">

import WalletCoinsItem from "@/components/wallet/WalletCoinsItem.vue";

import {useCoinsStore} from "@/stores/CoinsStore.ts";

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

//Решил сделать реализцию через scss без использования js, так как была такая рекомендация в ТЗ

@use 'sass:math';

//Миксин смещения монет и их переноса на другую строчку в зависимости от размеров экрана
@mixin coin-position($container, $i){
  $coinWidth: 8;
  $containerValue: calc($container / 1px);
  $left: ($i * $coinWidth) - $coinWidth;
  @if $left >= $containerValue{
    //Приравнивание container, чтобы оно делилось на ширину коина без остатка(позволяет сделать корректный отступ с новой строки)
    $multipleContainer: math.ceil(calc($containerValue / $coinWidth)) * $coinWidth;

    left: #{$left - math.floor(calc($left / $multipleContainer)) * $multipleContainer}px;
    top: #{math.floor(calc($left / $multipleContainer)) * 28}px
  }@else{
    left: #{$left}px;
  }
}


.wallet-coins{
  margin-bottom: 24px;
  height: 100px;
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
