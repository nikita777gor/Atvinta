<script setup lang="ts">

defineProps<{
  disabled: boolean,
  type: 'fill' | 'stroke',
  color: 'blue' | 'orange',
}>()


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
    >
      <slot/>
    </button>
  </div>
</template>

<style lang="scss" scoped>

//Легко масштабируемая стилизация кнопок(если в будущем понадобиться добавить еще какой-либо вариант кнопки, это легко можно будет сделать)


@mixin button-style($type, $color){
  @if($type == 'fill'){
    &:disabled {
      background-image: none;
      :slotted(*) {
        color: $color-disabled-text;
      }
      &::after{
        background-color: $color-disabled;
        opacity: 1;
      }
    }


    @if($color == 'orange') {@include fill-button1($color-orange, $color-light-orange);}

  }
  @else if($type == 'stroke'){
    background-color: transparent;
    border: solid 2px $color;
    &:disabled{
      border-color: $color-disabled;
      background-image: none;
      :slotted(*){
        color: $color-disabled;
      }
    }

    @if($color == 'orange') {@include stroke-button1($color-orange, $color-light-orange)};
    @if($color == 'blue') {@include stroke-button2($color-blue, $color-light-blue)};

  }
}

//Шаблоны стилей для разного типа кнопок(вынесено отдельно для наибольшей масштабируемости и легкости добавления кнопки нового цвета с уже имеющимися стилями)
@mixin fill-button1($color1, $color2){
  position: relative;
  overflow: hidden;
  background-image: linear-gradient($color2, $color1);

  &::after{
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
  }

  &:enabled:hover::after{
    background-color: $color1;
    opacity: 1;
  }
  &:enabled:active::after{
    background-color: $color2;
    opacity: 1;
  }
  &:hover, &:disabled{
    :slotted(*){
      z-index: 1;
    }
  }

}

@mixin stroke-button1($color1, $color2) {
  border: solid 2px $color1;
  &:enabled:hover{
    border-color: transparent;
    background-color: $color1;
  }
  &:enabled:active{
    border-color: transparent;
    background-color: $color2;
  }
}

@mixin stroke-button2($color1, $color2){
  border: solid 2px $color1;
  :slotted(*) {
    color: $color1;
  }

  &:enabled:hover{
    border-color: transparent;
    background-image: none;
    background-color: $color2;
    filter: drop-shadow(0px 0px 18px rgba($color1, 0.4));
    will-change: transform;
    :slotted(*){
      color: $color-gray;
    }
  }
  &:enabled:active{
    filter: none;
    background-color: transparent;
    :slotted(*){
      color: $color1;
    }
    border: solid 2px $color1;
  }
}




button {
  @include flex-center;
  border-radius: 50px;
  width: 236px;
  height: 48px;
  transition: 0.25s;
  &::after{
    transition: 0.25s;
  }
  :slotted(*){
    @extend .text;
  }
  &:disabled {
    cursor: no-drop;
  }

  //В зависимости от класса присутствующего в кнопке приминяем разные стили
  &.fill{
    &.orange{
      @include button-style('fill', 'orange');
    }
  }
  &.stroke{
    &.orange{
      @include button-style('stroke', 'orange');
    }
    &.blue{
      @include button-style('stroke', 'blue');
    }
  }
}





</style>
