<script setup lang="ts">

import RadioButton from "@/components/ui/RadioButton.vue";
import ProductionComponentsList from "@/components/production/ProductionComponentsList.vue";
import Button from "@/components/ui/Button.vue";

import {computed, onMounted, ref} from "vue";
import {coinsWordHelper} from "@/helpers/coinsWord.helper.ts";
import {STATIC_URL} from "@/const/api/apiUrl.const.ts";

import {useProductionStore} from "@/stores/ProductionStore.ts";


const productionStore = useProductionStore();

const computedCoinsWord = computed(() => {
  return coinsWordHelper(productionStore.productionRobotData!.createPrice);
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
                <RadioButton value="frontend" v-model="productionStore.productionRobotData!.type" group="type">
                  <p class="second-text">FrontEnd</p>
                </RadioButton>
                <RadioButton value="design" v-model="productionStore.productionRobotData!.type" group="type">
                  <p class="second-text">Design</p>
                </RadioButton>
              </div>
            </div>
            <div class="production-select-item">
              <p class="medium-text production-select-item-title">Стабилизатор:</p>
              <div class="production-select-item-radio">
                <RadioButton value="male" v-model="productionStore.productionRobotData!.stabilizer" group="stable">
                  <p class="second-text">Male</p>
                </RadioButton>
                <RadioButton value="famale" v-model="productionStore.productionRobotData!.stabilizer" group="stable">
                  <p class="second-text">Famale</p>
                </RadioButton>
              </div>
            </div>
          </div>

          <div class="production-components">
            <ProductionComponentsList v-for="component of productionStore.productionComponents" :key="component._id"

            />
          </div>

          <Button type="stroke" :disabled="true" color="orange">
            <p>Произвести за {{productionStore.productionRobotData!.createPrice}} {{computedCoinsWord}}</p>
          </Button>

          <p class="second-text text-slate">
            Для производства биоробота <br/> не хватает 2 биоруки,
            3 микрочипа и 1 души
          </p>

        </div>

        <img :src="STATIC_URL + '/robots/designerFamale1.png'" alt="robot"/>

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
