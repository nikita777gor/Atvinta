<script setup lang="ts">

import MarketItem from "@/components/market/MarketItem.vue";

import type {IMarketComponent} from "@/types/components.types.ts";

defineProps<{marketData: IMarketComponent[]}>()

</script>

<template>
  <div class="components-list">
    <MarketItem v-for="component of marketData"
                :key="component._id" :_id="component._id" :name="component.name"
                :buyPrice="component.buyPrice" :image="component.image"
    />
  </div>
</template>

<style scoped lang="scss">

@use '@/assets/scss/modules/components';

</style>
