<script setup lang="ts">

import Button from "@/components/ui/Button.vue";
</script>

<template>
  <div class="market-item">
    <img src="" class="market-item-image" alt="market item image">
    <div class="market-item-text">
      <p class="info-text">Биорука</p>
      <p class="text">Стоимость: 7 монет</p>
    </div>
    <Button type="fill" disabled="false" color="orange">
      <p class="text">Купить</p>
    </Button>
  </div>
</template>

<style scoped lang="scss">

@import "@/assets/scss/main.scss";

.market-item{
  @include components-list-item();


}

</style>
