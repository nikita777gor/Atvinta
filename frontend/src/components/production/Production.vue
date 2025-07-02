<script setup lang="ts">

import RadioButton from "@/components/ui/RadioButton.vue";
import ProductionComponentsList from "@/components/production/ProductionComponentsList.vue";
import Button from "@/components/ui/Button.vue";

import {computed, reactive, watch} from "vue";

import type {TProductionRobotStabilizer, TProductionRobotType} from "@/types/production.types.ts";
import {coinsWordHelper} from "@/helpers/coinsWord.helper.ts";
import {STATIC_URL} from "@/const/api/apiUrl.const.ts";

import {useProductionStore} from "@/stores/ProductionStore.ts";
import {useCoinsStore} from "@/stores/CoinsStore.ts";



const productionStore = useProductionStore();
const coinsStore = useCoinsStore();

const computedCoinsWord = computed(() => {
  return coinsWordHelper(productionStore.productionRobotData!.createPrice);
})

const computedButtonDisabled = computed(() => {
  const notMaxComponent = productionStore.productionComponents!.find((component) => {
    return component.count !== component.maxCount;
  })
  if(notMaxComponent || productionStore.productionRobotData!.createPrice > coinsStore.coinsCount){
    return true;
  }
  return false;
})

const computedMissingComponents = computed(() => {

//   Для склонения названий в комплектующих в разные формы и числа можно сделать словарь на бекенде, в котором каждое слово будет в разных формах и числах,
//   Ну я уже решил этим заниматься)

  let missingText: string = productionStore.productionComponents!.reduce((acc, component) => {

  })
  return missingText

})


const productionSelectedRobot = reactive<{type: TProductionRobotType, stabilizer: TProductionRobotStabilizer}>({
  type: productionStore.productionRobotData!.type,
  stabilizer: productionStore.productionRobotData!.stabilizer
})

watch(productionSelectedRobot, () => {
  productionStore.productionRobotData!.stabilizer = productionSelectedRobot.stabilizer;
  productionStore.productionRobotData!.type = productionSelectedRobot.type;
  productionStore.changeProductionRobot();
})


</script>

<template>

  <div class="block">
    <div class="production">
      <h2 class="block-title">Производство</h2>

      <div class="production-wrapper">

        <div class="production-main">

          <div class="production-select">
            <div class="production-select-item">
              <p class="medium-text production-select-item-title">Тип биоробота:</p>
              <div class="production-select-item-radio">
                <RadioButton value="frontend" v-model="productionSelectedRobot.type" group="type">
                  <p class="second-text">FrontEnd</p>
                </RadioButton>
                <RadioButton value="design" v-model="productionSelectedRobot.type" group="type">
                  <p class="second-text">Design</p>
                </RadioButton>
              </div>
            </div>
            <div class="production-select-item">
              <p class="medium-text production-select-item-title">Стабилизатор:</p>
              <div class="production-select-item-radio">
                <RadioButton value="male" v-model="productionSelectedRobot.stabilizer" group="stable">
                  <p class="second-text">Male</p>
                </RadioButton>
                <RadioButton value="famale" v-model="productionSelectedRobot.stabilizer" group="stable">
                  <p class="second-text">Famale</p>
                </RadioButton>
              </div>
            </div>
          </div>

          <div class="production-components">
            <ProductionComponentsList v-for="component of productionStore.productionComponents" :key="component._id"
                                      :_id="component._id" :count="component.count" :max-count="component.maxCount"
                                      :icons="component.icons"

            />
          </div>

          <Button type="stroke" :disabled="computedButtonDisabled" color="orange">
            <p>Произвести за {{productionStore.productionRobotData!.createPrice}} {{computedCoinsWord}}</p>
          </Button>

          <p class="second-text text-slate">
            Для производства биоробота <br/> не хватает 2 биоруки,
            3 микрочипа и 1 души
          </p>

        </div>

        <img :src="STATIC_URL + productionStore.productionRobotData!.images.forbiddenCreateImg" alt="robot"/>

      </div>


    </div>
  </div>

</template>

<style scoped lang="scss">


.production{

  &-wrapper{
    @include flex-items-start;
    gap: 40px;
    width: 100%;
    @media (max-width: $screen-lg) {
      @include flex-col-reverse-gap(30px)
    }
  }

  img{
    width: 236px;
    height: auto;
  }

  &-main{
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 24px;
    @media (max-width: $screen-2xl) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: $screen-xl) {
      grid-template-columns: 1fr;
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
        p{
          min-width: 63px;
          @media (max-width: $screen-xl) {
            min-width: 0px;
          }
        }
        @include flex-between();
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
