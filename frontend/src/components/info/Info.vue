<script setup lang="ts">

</script>

<template>

  <div class="block">
    <div class="info">
      <div class="info-text">
        <h1 class="info-title">Фабрика по производству биороботов</h1>
        <p class="info-description text-slate">класса «монитор-кресло»</p>
      </div>
      <img class="info-image" src="/info/image.png" alt="robots"/>
    </div>
  </div>

</template>

<style scoped lang="scss">

.info{
  @include flex-between;

  @media (max-width: $screen-lg){
    @include flex-col-gap(30px);
    &-title{
      text-align: center;
    }
    &-description{
      display: none;
    }
  }

  &-image{
    width: 320px;
    @media (max-width: $screen-2xl){
      width: 236px;
    }
  }
  &-title{
    margin-bottom: 24px;
  }
}

</style>
