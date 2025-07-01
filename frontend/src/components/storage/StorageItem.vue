<script setup lang="ts">

import Button from "@/components/ui/Button.vue";

import type {IStorageComponent} from "@/types/components.types.ts";
import {coinsWordHelper} from "@/helpers/coinsWord.helper.ts";

import {useStorageStore} from "@/stores/StorageStore.ts";


const storageStore = useStorageStore();

defineProps<IStorageComponent>()





</script>

<template>

  <div class="components-list-item">
    <div class="components-list-item-content">
      <div class="components-list-item-text">
        <p>{{ name }}</p>
        <p>Стоимость: {{ sellPrice }} {{ coinsWordHelper(sellPrice) }}</p>
      </div>
      <div class="components-list-item-text">
        <Transition :name="storageStore.storageComponentAnimation" class="counter-animation-wrapper">
          <p class="components-list-item-text" :key="count">{{ count }} шт.</p>
        </Transition>
      </div>
      <Button @click="storageStore.sellStorageComponent(_id, sellPrice)" type="stroke" :disabled="!Boolean(count)" color="blue">
        <p>Продать</p>
      </Button>
    </div>
  </div>

</template>

<style scoped lang="scss">

@use '@/assets/scss/modules/components';

.counter-animation-wrapper{
  height: 24px;
}

.increment-enter-active{
  animation: count 0.4s ease-in;
}
.decrement-enter-active{
  animation: count 0.4s reverse ease-in;
}
.increment-leave-active, .decrement-leave-active{
  position: absolute;
  width: 100%;
}

@keyframes count{
  0%{
    transform: translateY(0px);
  }
  40%{
    transform: translateY(30px);
    opacity: 0;
  }
  60%{
    transform: translateY(-30px);
    opacity: 0;
  }
  100%{
    transform: translateY(0px);
    opacity: 1;
  }
}



</style>
