<script setup lang="ts">

const model = defineModel<boolean>();

</script>

<template>

  <label class="checkbox">
    <input v-model="model" class="checkbox-input" type="checkbox">
    <span class="checkbox-text">
      <slot/>
    </span>
  </label>

</template>

<style scoped lang="scss">

.checkbox{
  width: fit-content;
  cursor: pointer;
  @include flex-center;

  &:hover{
    input{
      border-color: $color-disabled;
    }
  }

  &-text{
    padding-left: 8px;
  }
  &-input{
    cursor: pointer;
    transition: 150ms;
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
    &:disabled{
      border-color: $color-disabled;
    }
  }
}

</style>
