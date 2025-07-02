<script setup lang="ts">
import { RouterView } from 'vue-router'
import Window from "@/components/ui/Window.vue";
import PreloaderView from "@/components/preloader/PreloaderView.vue";

import {usePreloaderStore} from "@/stores/PreloaderStore.ts";
import {useWindowStore} from "@/stores/WindowStore.ts";

const preloaderStore = usePreloaderStore();

</script>

<template>
  <div class="background view">
    <Transition name="show-page">
      <div v-show="!preloaderStore.preloaderStatus">


        <RouterView/>
        <Window/>

      </div>
    </Transition>

    <PreloaderView v-show="preloaderStore.preloaderStatus"/>

  </div>
</template>

<style lang="scss">

@use '@/assets/scss/styles' as *;

.view{
  position: relative;
}

//Анимация появления страницы
.show-page-enter-active{
  animation: show-page 0.4s ease-out;
}

@keyframes show-page {
  0%{
    opacity: 0;
    transform: scale(0.9);
  }
  100%{
    opacity: 1;
    transform: scale(1);
  }
}



</style>
