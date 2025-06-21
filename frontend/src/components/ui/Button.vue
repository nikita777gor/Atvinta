<script setup lang="ts">

defineProps<{
  disabled: boolean,
  type: 'fill' | 'stroke',
  color: 'blue' | 'orange',
}>()

const emit = defineEmits<{
  (e: 'event'): void
}>();

</script>

<template>
  <div class="button-wrapper">
    <button :class="{
    fill: type === 'fill',
    stroke: type === 'stroke',
    blue: color === 'blue',
    orange: color === 'orange'
    }"
            :disabled="disabled"
            @click="$emit('event')"
    >
      <slot/>
    </button>
  </div>
</template>

<style lang="scss" scoped>

@import '@/assets/scss/main.scss';

//Легко масштабируемая стилизация кнопок(если в будущем понадобиться добавить еще какой-либо вариант кнопки, это легко можно будет сделать)

@mixin style-button($type, $color1, $color2, $style: 1){
  @if($type == 'fill'){
    background-color: $color1;
    &:hover{
      background-color: $color2;
    }
    &:active{
      background-color: $color1;
    }

    &:disabled {
      background-color: $color-disabled;
      :slotted(*) {
        color: $color-disabled-text;
      }
    }
  }
  @else if($type == 'stroke'){
    background-color: transparent;

    @if($style == 1){
      border: solid 2px $color1;
      &:hover{
        transition: 0.25s;
        border-color: transparent;
        background-color: $color1;
      }
      &:active{
        border-color: transparent;
        background-color: $color2;
      }
    }@else if($style == 2){
      border: solid 2px $color1;
      :slotted(*) {
        color: $color1;
      }

      &:hover{
        border-color: transparent;
        background-image: none;
        background-color: $color2;
        filter: drop-shadow(0px 1px 18px rgba($color1, 0.4));
        :slotted(*){
          color: $color-bg2;
        }
      }
      &:active{
        background-color: transparent;
        :slotted(*){
          color: $color1;
        }
        border: solid 2px $color1;
      }
    }

    &:disabled{
      border-color: $color-disabled;
      :slotted(*){
        color: $color-disabled;
      }
    }
  }
}

button {
  @include flex-center;
  transition: 0.25s;
  border-radius: 50px;
  width: 236px;
  height: 48px;
  &:disabled {
    cursor: no-drop;
  }


  &.fill{
    &.orange{
      @include style-button('fill', $color-orange, $color-light-orange);
    }
  }
  &.stroke{
    &.orange{
      @include style-button('stroke', $color-orange, $color-light-orange);
    }
    &.blue{
      @include style-button('stroke', $color-blue, $color-light-blue, 2);
    }
  }

}











</style>
