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
          <img :src="windowStore.windowData?.img" alt="window image">
          <div>
            <h2 class="window-content-title">{{windowStore.windowData?.title}}</h2>
            <p class="info-text window-content-description">{{windowStore.windowData?.description}}</p>
          </div>
        </div>
      </div>

      <div @click="windowStore.hideWindow()" class="overlay"></div>

    </div>

  </Transition>



</template>

<style scoped lang="scss">

body{
  overflow: hidden;
}


.wrapper{
  position:fixed;
  display:flex;
  width:100%;
  height:100%;
  justify-content:center;
  align-items:center;
  z-index: 10;
  background: black;
}

.overlay{
  position: absolute;
  height:100%;
  width:100%;
  z-index: 5;

}

.window{

  border-radius: 12px;
  width: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 34px 100px 40px 34px;

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

    display: flex;
    align-items: start;
    gap: 30px;

    img{
      max-width: 43px;
      width: auto;
      height: auto;
    }

    &-title{
      color: $color-gray;
      margin-bottom: 23px;
    }
    &-description{

      color: $color-disabled;
    }
  }
}




</style>
