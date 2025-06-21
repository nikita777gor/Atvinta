<script setup lang="ts">

</script>

<template>

  <div class="block">
    <div class="info">
      <div class="info-text">
        <h1 class="info-title">Фабрика по производству биороботов</h1>
        <p class="info-text text-slate">класса «монитор-кресло»</p>
      </div>
      <img class="info-image" src="/info/image.png" alt="robots"/>
    </div>
  </div>

</template>

<style scoped lang="scss">

@import "@/assets/scss/main.scss";

.info{
  @include flex-between;

  &-image{
    width: 320px;
  }
  &-title{
    margin-bottom: 24px;
  }
}

</style>
