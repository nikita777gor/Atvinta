<script setup lang="ts">

import StorageItem from "@/components/storage/StorageItem.vue";
import type {IStorageComponent} from "@/types/components.types.ts";

defineProps<{storageData: IStorageComponent[]}>()

</script>

<template>
  <div class="components-list">
    <StorageItem v-for="component of storageData" :key="component._id"
                 :_id="component._id" :sellPrice="component.sellPrice"
                 :name="component.name" :count="component.count"
    />
  </div>
</template>

<style scoped lang="scss">

@use '@/assets/scss/modules/components';


</style>
