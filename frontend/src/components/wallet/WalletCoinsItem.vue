<script setup lang="ts">

</script>

<template>
  <Transition appear name="show">
    <img class="wallet-coins-item"
         src="/icons/coin.png" alt="coin"
    >
  </Transition>
</template>

<style scoped lang="scss">

.show{
  &-enter-active{
    animation: show-in 0.4s;
  }
  &-leave-active{
    animation: show-in 0.5s reverse;
  }
}

@keyframes show-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes show-out{
  0% {
    opacity: 100%;
  }
  100% {
    opacity: 0%;
    transform: translateY(20px);
  }
}

</style>
