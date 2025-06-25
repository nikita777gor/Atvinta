<script setup lang="ts">
import { RouterView } from 'vue-router'
import PreloaderView from "@/components/preloader/PreloaderView.vue";

import {usePreloaderStore} from "@/stores/PreloderStore.ts";

const preloaderStore = usePreloaderStore();

</script>

<template>
  <RouterView v-show="!preloaderStore.preloaderStatus"/>
  <PreloaderView v-show="preloaderStore.preloaderStatus"/>
</template>

<style lang="scss">




</style>
