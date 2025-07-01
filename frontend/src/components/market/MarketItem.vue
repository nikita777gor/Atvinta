<script setup lang="ts">

import {STATIC_URL} from "@/const/api/apiUrl.const.ts";
import {computed} from "vue";
import Button from "@/components/ui/Button.vue";
import type {IMarketComponent} from "@/types/components.types.ts";

import {coinsWordHelper} from "@/helpers/coinsWord.helper.ts";

import {useCoinsStore} from "@/stores/CoinsStore.ts";
import {useStorageStore} from "@/stores/StorageStore.ts";


const coinsStore = useCoinsStore();
const storageStore = useStorageStore();

const props = defineProps<IMarketComponent>()

const computedButtonDisable = computed(() => {
  return coinsStore.coinsCount < props.buyPrice;
})

</script>

<template>
  <div @click="storageStore.buyStorageComponent(_id, buyPrice)" class="components-list-item">
    <div class="components-list-item-image">
      <img :src="STATIC_URL + image" alt="market item image">
    </div>
    <div class="components-list-item-content">
      <div class="components-list-item-text">
        <p class="info-text">{{ name }}</p>
        <p class="text">Стоимость: {{buyPrice}} {{ coinsWordHelper(buyPrice) }}</p>
      </div>
      <Button type="fill" :disabled="computedButtonDisable" color="orange">
        <p>Купить</p>
      </Button>
    </div>
  </div>
</template>

<style lang="scss">

@use '@/assets/scss/modules/components';


</style>
