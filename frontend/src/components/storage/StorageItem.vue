<script setup lang="ts">

import Button from "@/components/ui/Button.vue";
</script>

<template>

  <div class="storage-item">
    <div class="storage-item-text">
      <p class="info-text">Биорука</p>
      <p class="text">Стоимость: 7 монет</p>
    </div>
    <p class="info-text">4 шт.</p>
    <Button type="stroke" :disabled="false" color="blue">
      <p class="text">Продать</p>
    </Button>
  </div>

</template>

<style scoped lang="scss">


.storage-item {
  @include components-list-item();
}


</style>
