<script setup lang="ts">

import RadioButton from "@/components/ui/RadioButton.vue";
import ProductionComponentsList from "@/components/production/ProductionComponent.vue";
import PreloaderBlock from "@/components/preloader/PreloaderBlock.vue";
import Button from "@/components/ui/Button.vue";

import {computed, reactive, ref, watch} from "vue";

import {coinsWordHelper} from "@/helpers/coinsWord.helper.ts";
import {STATIC_URL} from "@/const/api/apiUrl.const.ts";

import {useProductionStore} from "@/stores/ProductionStore.ts";
import {useCoinsStore} from "@/stores/CoinsStore.ts";




const productionStore = useProductionStore();
const coinsStore = useCoinsStore();




// Вычисляемые свойства

const computedRobotImageClass = computed((): string => {
  if(productionStore.checkCanCreateProduction()){
    return 'production-robot-image-can-create'
  }
  return 'production-robot-image-cannot-create'

  // В тз не описано когда должна отображаться картика собранного робота
  // return 'production-robot-image-created'
})


const computedCreateButtonDisabled = computed(():boolean => {
  return !productionStore.checkCanCreateProduction();
})


const computedCoinsWord = computed(() => {
  return coinsWordHelper(productionStore.productionRobotData!.createPrice);
})


const computedMissingProductionText = computed(() => {

//   Так как я сделал бекенд с возможностью расширения ассортимента комплектующих то
//   для склонения названий в комплектующих в разные формы и числа можно сделать словарь на бекенде, в котором каждое слово будет в разных формах и числах.
//   Ну я уже решил этим заниматься)

  const isEnoughCoins:boolean = coinsStore.coinsCount >= productionStore.productionRobotData!.createPrice;
  const isEnoughComponents:boolean = !Boolean(productionStore.productionComponents.find((component) => {
    return productionStore.getProductionComponentCount(component.setStatuses) !== component.setStatuses.length;
  }));

  if(!isEnoughCoins && isEnoughComponents) return "Для производства биоробота не хватает денег";

  const missingArr: string[] = productionStore.productionComponents.reduce((acc, component) => {
    if(!component.setStatuses.includes(false)){
      return acc;
    }
    acc.push(component.name.toLowerCase());
    return acc;
  }, new Array())
  if(!isEnoughCoins){
    missingArr.push('монет')
  }
  const formater = new Intl.ListFormat('ru', {type: 'conjunction'});
  return 'Для производства биоробота не хватает элементов: ' + formater.format(missingArr);
})


</script>

<template>

  <div v-if="productionStore.productionRobotData" class="block">
    <div class="production">
      <h2 class="block-title">Производство</h2>

      <div>

      </div>
      <div class="production-wrapper">

        <PreloaderBlock class="production-preloader" v-if="productionStore.productionPreloaderStatus"/>

        <div v-else class="production-content">
          <div class="production-main">

            <div class="production-select">
              <div class="production-select-item">
                <p class="medium-text production-select-item-title">Тип биоробота:</p>
                <div class="production-select-item-radio">
                  <RadioButton value="frontend" @change="productionStore.changeProductionRobot()" v-model="productionStore.productionRobotData.type" group="type">
                    <p class="second-text">FrontEnd</p>
                  </RadioButton>
                  <RadioButton value="design" @change="productionStore.changeProductionRobot()" v-model="productionStore.productionRobotData.type" group="type">
                    <p class="second-text">Design</p>
                  </RadioButton>
                </div>
              </div>
              <div class="production-select-item">
                <p class="medium-text production-select-item-title">Стабилизатор:</p>
                <div class="production-select-item-radio">
                  <RadioButton value="male" @change="productionStore.changeProductionRobot()" v-model="productionStore.productionRobotData.stabilizer" group="stable">
                    <p class="second-text">Male</p>
                  </RadioButton>
                  <RadioButton value="famale" @change="productionStore.changeProductionRobot()" v-model="productionStore.productionRobotData.stabilizer" group="stable">
                    <p class="second-text">Famale</p>
                  </RadioButton>
                </div>
              </div>
            </div>

            <div class="production-components">
              <ProductionComponentsList v-for="component of productionStore.productionComponents" :key="component._id"
                                        :_id="component._id" :setStatuses="component.setStatuses" :name="component.name"
                                        :icons="component.icons"

              />
            </div>

            <Button @click="productionStore.createProductionRobot()" type="stroke" :disabled="computedCreateButtonDisabled" color="orange">
              <p>Произвести за {{productionStore.productionRobotData.createPrice}} {{computedCoinsWord}}</p>
            </Button>

            <p v-if="computedCreateButtonDisabled" class="second-text text-slate">
              {{computedMissingProductionText}}
            </p>

          </div>

          <div :style="{backgroundImage: `url(${STATIC_URL + productionStore.productionRobotData.images})`}"
               class="production-robot-image" :class="computedRobotImageClass"></div>

        </div>

      </div>



    </div>
  </div>

</template>

<style scoped lang="scss">


.production{

  &-preloader{
    min-height: 260px;
  }

  &-content{
    @include flex-items-start;
    gap: 40px;
    width: 100%;
    @media (max-width: $screen-lg) {
      @include flex-col-reverse-gap(30px)
    }
  }

  &-robot-image{
    width: 236px;
    height: 320px;
    &-created{
      background-position: -0 -0;
    }
    &-can-create{
      background-position: -236px -0;
    }
    &-cannot-create{
      background-position: -472px -0;
    }
  }

  &-main{
    display: grid;
    grid-template-columns: 236px 2fr;
    gap: 24px;
    @media (max-width: $screen-2xl) {
      grid-template-columns: 236px 236px;
    }
    @media (max-width: $screen-xl) {
      grid-template-columns: 236px;
    }
  }


  &-select{
    width: 236px;
    @include flex-col-gap(30px);
    &-item{
      width: 100%;
      &-title{
        margin-bottom: 16px;
      }
      &-radio{
        @include flex-between();
        p{
          min-width: 63px;
          @media (max-width: $screen-xl) {
            min-width: 0px;
          }
        }
      }
    }
  }

  &-components{
    @include flex-items-start;
    flex-direction: column;
    gap: 16px;
  }

}



</style>
