<script setup lang="ts">

</script>

<template>

  <label class="checkbox">
    <input :name="group" class="checkbox-input" type="checkbox">
    <span class="checkbox-text">
      <slot/>
    </span>
  </label>

</template>

<style scoped lang="scss">

@import "@/assets/scss/main.scss";

.checkbox{
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
    border:solid 2px $color-slate;

    &::after{
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0px;
      height: 0px;
    }
    &:checked::after{
      transition: 200ms;
      width: 16px;
      height: 16px;
      background-image: url("/icons/check.svg");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
    &:hover, &:disabled{
      transition: 100ms;
      border-color: $color-disabled;
    }
  }
}

</style>
