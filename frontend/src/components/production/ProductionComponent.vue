<script setup lang="ts">

import {computed, ref} from "vue";

import type {IProductionComponent} from "@/types/components.types.ts";
import ProductionComponentItem from "@/components/production/ProductionComponentItem.vue";
import {STATIC_URL} from "@/const/api/apiUrl.const.ts";

import {useStorageStore} from "@/stores/StorageStore.ts";


const props = defineProps<IProductionComponent>()

const storageStore = useStorageStore();



// Переделать, в данном компоненте просто менять вид на 3 состояния в массиве

const stockStatuses = ():boolean[] => {
  const storageComponent = storageStore.storageData.find((component) => {
    return component._id === props._id;
  })
  if(!storageComponent){
    return new Array(props.setStatuses.length).fill(false);
  }
  let storageComponentCount: number = storageComponent.count;
  console.log(storageComponentCount);
  const arr = props.setStatuses.reduce((acc, status) => {

    if(!status && storageComponentCount > 0){
      storageComponentCount--;
      acc.push(true);
      return acc;
    }
    acc.push(false);
    return acc;
  }, new Array());
  console.log(arr);
  return arr;
}


</script>

<template>
  <div class="production-component">
    <ProductionComponentItem v-for="(item, index) of setStatuses" :key="index" :index="index" :_id="_id"
                             :set-status="item" :stock-status="stockStatuses()[index]" :icons="STATIC_URL + icons"/>
  </div>
</template>

<style scoped lang="scss">

.production-component{
  @include flex-gap(10px);
}

</style>
