<script setup lang="ts">

import Checkbox from "@/components/ui/Checkbox.vue";
import WalletCoins from "@/components/wallet/WalletCoins.vue";
import Link from "@/components/ui/Link.vue";


import {computed, ref} from "vue";

import {coinsWordHelper} from "@/helpers/coinsWord.helper.ts";
import {useCoinsStore} from "@/stores/CoinsStore.ts";

const coinsStore = useCoinsStore();


const checkboxIsEnable = ref<boolean>(false);

const computedCoinsWord = computed(() => {
  return coinsWordHelper(coinsStore.coinsCount);
})

const computedLinkDisabled = computed(() => {
  return coinsStore.coinsCount < coinsStore.maxCoinsCount ? false : true;
})

</script>

<template>

  <div class="block">
    <div class="wallet">
      <h2 class="block-title">Кошелек криптовалют</h2>
      <WalletCoins/>
      <p class="info-text text-slate wallet-coins-count">
        {{coinsStore.coinsCount}} <span>biorobo {{ computedCoinsWord }}</span>
      </p>
      <div class="wallet-buttons">
        <Link @click="coinsStore.changeCoinsCount(checkboxIsEnable ? 5 : 1)" :disabled="computedLinkDisabled">
          <p class="text">
            Нацыганить
          </p>
        </Link>
        <Checkbox v-model="checkboxIsEnable">
          <p class="text">Цыганить по 5 монет</p>
        </Checkbox>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">

.wallet{
  &-coins-count{
    margin-bottom: 34px;
    span{
      color: $color-slate;
      font-weight: 500;
    }
  }

  &-buttons{
    @include flex-gap(27px);
  }


}

</style>
