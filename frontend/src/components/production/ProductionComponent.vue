<script setup lang="ts">

import {ref} from "vue";

import {STATIC_URL} from "@/const/api/apiUrl.const.ts";
import type {IProductionComponent} from "@/types/components.types.ts";



defineProps<IProductionComponent>()


</script>

<template>
  <div class="components-list">
    <div v-for="component of maxCount" class="components-item">
      <img :src="STATIC_URL + icons.outStockIcon" alt="production component">
    </div>
  </div>
</template>

<style scoped lang="scss">

.components-list{
  @include flex-gap(10px);
  div{
    cursor: pointer;
    img{
      width: 48px;
      height: auto;
    }
  }
}

</style>
