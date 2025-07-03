<script setup lang="ts">

import {useWindowStore} from "@/stores/WindowStore.ts";

const windowStore = useWindowStore();


</script>

<template>

  <Transition name="show-window">

    <div class="wrapper" v-if="windowStore.windowStatus">
      <div class="window">
        <div @click="windowStore.hideWindow()" class="window-close"></div>
        <div class="window-content">
          <div v-if="windowStore.windowData?.img" class="window-content-image">
            <img :src="windowStore.windowData?.img" alt="window image">
          </div>
          <h2 class="window-content-title desktop">{{windowStore.windowData?.title}}</h2>
          <p class="window-content-title mobile info-text">{{windowStore.windowData?.title}}</p>
          <p class="window-content-description info-text desktop">{{windowStore.windowData?.description}}</p>
          <p class="window-content-description mobile medium-text">{{windowStore.windowData?.description}}</p>
        </div>
      </div>

      <div @click="windowStore.hideWindow()" class="overlay"></div>
    </div>


  </Transition>



</template>

<style scoped lang="scss">

.overlay{
  background-color: rgba(17, 17, 17, 0.75);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
}

.window{

  border-radius: 12px;
  width: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 34px 34px 40px 34px;
  z-index: 30;

  @media (max-width: $screen-lg) {
    width: 236px;
    padding: 20px 20px 30px 20px;
  }

  &-close{
    position: absolute;
    cursor: pointer;
    width: 20px;
    height: 20px;
    top: 18px;
    right: 18px;
    &::before, &::after {
      transition: 0.3s;
      position: absolute;
      top: 50%;
      left: 10%;
      transform: translate(-50%, -50%);
      content: '';
      width: 20px;
      height: 2.5px;
      background: $color-light-orange;
    }
    &::before{
      transform: rotate(45deg);
    }
    &::after{
      transform: rotate(-45deg);
    }
    &:hover{
      &::before, &::after {
        background: $color-orange;
      }
    }
  }


  &-content{

    display: grid;
    grid-template-columns: 43px 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 30px;
    grid-template-areas:
    "image title"
    ". description";
    @media (max-width: $screen-lg) {
      @include flex-col-gap(10px);
      text-align: center;
    }

    &-image{
      @include flex-items-center;
      img{
        max-width: 43px;
        width: auto;
        height: auto;
      }
      grid-area: image;
    }

    &-title{
      color: $color-gray;
      grid-area: title;
    }
    &-description{
      color: $color-disabled;
      grid-area: description;
    }
  }
}

.desktop{
  @media (max-width: $screen-lg) {
    display: none;
  }
}
.mobile{
  display: none;
  @media (max-width: $screen-lg) {
    display: block;
  }
}


//Анимация появления модального окна
.show-window-enter-active{
  animation: show-window 0.25s;
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
