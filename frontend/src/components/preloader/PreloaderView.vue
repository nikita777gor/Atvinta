<script setup lang="ts">

import PreloaderCubes from "@/components/preloader/PreloaderCubes.vue";

</script>

<template>
  <div class="background">
    <div class="preloader-wrapper">
      <PreloaderCubes class="preloader-item"/>
    </div>
  </div>

</template>

<style scoped lang="scss">

@import "@/assets/scss/main.scss";

.preloader{
  &-wrapper{
    @include flex-center;
    height: 100vh;
  }
  &-item{
    padding-top: 170px;
    --uib-size: 100px;
  }
}

</style>
