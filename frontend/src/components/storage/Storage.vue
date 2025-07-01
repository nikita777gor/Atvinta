<script setup lang="ts">

import StorageList from "@/components/storage/StorageList.vue";

import {useStorageStore} from "@/stores/StorageStore.ts";

const storageStore = useStorageStore();

</script>

<template>

  <div class="block">
    <div class="storage">
      <h2 class="block-title">Склад</h2>
      <StorageList :storageData="storageStore.storageData"/>
    </div>
  </div>

</template>

<style scoped lang="scss">

</style>
