<script setup lang="ts">

import {computed, ref} from "vue";

import type {TProductionItemStatus} from "@/types/production.types.ts";
import type {IProductionComponent} from "@/types/components.types.ts";
import ProductionComponentItem from "@/components/production/ProductionComponentItem.vue";

import {STATIC_URL} from "@/const/api/apiUrl.const.ts";
import {useStorageStore} from "@/stores/StorageStore.ts";


const props = defineProps<IProductionComponent>()

const storageStore = useStorageStore();



// Преобразование статусов установки приходящих с бекенда(true, false), на статусы элемента комплектующей (unset, set, stock)
// Сделано потому что на бекенде и компонентах выше нет смысла хранить состояние возможности установить элемент

const computedItemsStatus = computed(():TProductionItemStatus[] => {
  const storageComponent = storageStore.storageData.find((component) => {
    return component._id === props._id;
  })
  if(!storageComponent){
    return new Array(props.setStatuses.length).fill('unset');
  }
  let storageComponentCount: number = storageComponent.count;
  return props.setStatuses.reduce((acc: TProductionItemStatus[], setStatus: boolean) => {
    if(setStatus){
      acc.push('set')
      return acc;
    }
    if(storageComponentCount > 0){
      storageComponentCount--;
      acc.push('stock');
      return acc;
    }
    acc.push('unset');
    return acc;
  }, new Array());
})


</script>

<template>
  <div class="production-component">
    <ProductionComponentItem v-for="(item, index) of setStatuses" :key="index" :index="index" :_id="_id"
                             :status="computedItemsStatus[index]" :icons="STATIC_URL + icons"/>
  </div>
</template>

<style scoped lang="scss">

.production-component{
  @include flex-gap(10px);
}

</style>
