<script setup lang="ts">

import Button from "@/components/ui/Button.vue";

</script>

<template>
  <div class="block">
    <div class="header">
      <img class="header-logo" src="/logo/Logo.png" alt="logo">
      <Button class="test" :disabled="false" type="stroke" color="orange">
        <p>Произвести биоробота</p>
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.header{
  @include flex-between;
  padding: 48px 0;

  &-logo{
    height: 48px;
    @media (max-width: $screen-lg){
      display: none;
    }
  }
}



</style>
