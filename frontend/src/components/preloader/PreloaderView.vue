<script setup lang="ts">

import PreloaderCubes from "@/components/preloader/PreloaderCubes.vue";

</script>

<template>
  <div class="preloader-wrapper">
    <PreloaderCubes class="preloader-item"/>
  </div>

</template>

<style scoped lang="scss">


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
