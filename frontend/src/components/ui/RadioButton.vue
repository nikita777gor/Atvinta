<script setup lang="ts">

defineProps<{
  group: string
}>()

</script>

<template>
  <label class="radio">
    <input :name="group" @change="console.log(432423)" class="radio-input" type="radio">
    <span class="radio-text">
      <slot/>
    </span>
  </label>
</template>

<style scoped lang="scss">

@import "@/assets/scss/main.scss";

.radio{
  width: fit-content;
  @include flex-center;
  &-text{
    padding-left: 8px;
  }
  &-input{
    appearance: none;
    position: relative;
    width: 24px;
    height: 24px;
    background: transparent;
    border-radius: 100%;
    border:solid 2px $color-slate;
    transition: 500ms;

    &::after{
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      border-radius: 100%;
      background-color: $color-orange;
      transition: 250ms;
    }
    &:checked::after{
      width: 16px;
      height: 16px;
    }
    &:hover, &:disabled{
      transition: 100ms;
      border-color: $color-disabled;
    }
  }
}

</style>
