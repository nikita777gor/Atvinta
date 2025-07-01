<script setup lang="ts">
import { RouterView } from 'vue-router'
import Window from "@/components/ui/Window.vue";
import PreloaderView from "@/components/preloader/PreloaderView.vue";

import {usePreloaderStore} from "@/stores/PreloaderStore.ts";
import {useWindowStore} from "@/stores/WindowStore.ts";

const preloaderStore = usePreloaderStore();

</script>

<template>
  <div class="background app">
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

.app{
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


//Анимация появления модального окна
.show-window-enter-active{
  animation: show-window 0.2s;
}

.show-window-leave-active{
  animation: show-window 0.15s reverse;
}

@keyframes show-window {
  0%{
    opacity: 0;

  }
  100%{
    opacity: 1;
  }
}


</style>
