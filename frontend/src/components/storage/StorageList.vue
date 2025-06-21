<script setup lang="ts">

import StorageItem from "@/components/storage/StorageItem.vue";

</script>

<template>
  <div class="storage-list">
    <StorageItem/>
    <StorageItem/>
    <StorageItem/>
    <StorageItem/>
  </div>
</template>

<style scoped lang="scss">

@import "@/assets/scss/main.scss";

.storage-list {
  @include components-list();
}

</style>
