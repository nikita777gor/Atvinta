<script setup lang="ts">

import {computed} from "vue";
import type {TProductionItemStatus} from "@/types/production.types.ts";
import {useProductionStore} from "@/stores/ProductionStore.ts";


const props = defineProps<{
  _id: string,
  index: number,
  status: TProductionItemStatus,
  icons: string
}>()

const productionStore = useProductionStore();

const computedItemImageClass = computed(() => {
  if(props.status === 'set') return 'set-icon';
  if(props.status === 'stock') return 'stock-icon';
  return 'unset-icon'
})


const handleItemClick = () => {
  if(props.status === 'set'){
    productionStore.removeProductionComponent(props._id, props.index);
  }
  if(props.status === 'stock'){
    productionStore.addProductionComponent(props._id, props.index);
  }
}

</script>

<template>
  <div @click="handleItemClick()"
    :style="{backgroundImage: `url(${icons})`}" class="production-component-item" :class="computedItemImageClass"></div>
</template>

<style scoped lang="scss">

.production-component-item {
  height: 48px;
  width: 48px;
  border-radius: 4px;
  cursor: pointer;
}
.set-icon{
  background-position: -0 -0;
}
.stock-icon{
  background-position: -48px -0;
}
.unset-icon{
  background-position: -96px -0;
  cursor: no-drop;
}

</style>
