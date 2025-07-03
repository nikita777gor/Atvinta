<script setup lang="ts">

import {computed} from "vue";
import {useProductionStore} from "@/stores/ProductionStore.ts";


const props = defineProps<{
  _id: string,
  index: number,
  setStatus: boolean,
  stockStatus: boolean,
  icons: string
}>()

const productionStore = useProductionStore();

const computedItemImageClass = computed(() => {
  if(props.setStatus) return 'set-icon';
  if(!props.setStatus && props.stockStatus) return 'stock-icon';
  return 'unset-icon'
})


</script>

<template>
  <div @click="setStatus ? productionStore.removeProductionComponent(_id, index) : productionStore.addProductionComponent(_id, index)"
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
}

</style>
