<script setup lang="ts">
import { RouterView } from 'vue-router'
import PreloaderView from "@/components/preloader/PreloaderView.vue";

</script>

<template>
  <RouterView v-show="true"/>
  <PreloaderView v-show="false"/>
</template>

<style lang="scss">




</style>
