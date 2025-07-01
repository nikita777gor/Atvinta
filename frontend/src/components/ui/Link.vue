<script setup lang="ts">

defineProps<{
  disabled: boolean
}>();


</script>

<template>
  <button :disabled="disabled">
    <slot/>
  </button>
</template>

<style scoped lang="scss">


button{
  background-color: transparent;
  cursor: pointer;
  :slotted(*){
    transition: 0.15s;
    color: $color-light-orange;
    text-decoration: underline;
  }
  &:enabled:hover{
    :slotted(*){
      color: $color-orange;
    }
  }
  &:enabled:active{
    :slotted(*){
      text-decoration: none;
    }
  }
  &:disabled{
    cursor: not-allowed;
    :slotted(*){
      color: $color-disabled;
    }
  }
}

</style>
