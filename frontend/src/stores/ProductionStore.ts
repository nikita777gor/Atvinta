import {defineStore} from "pinia";
import {ref} from "vue";

import type {IProductionRobot} from "@/types/production.types.ts";
import type {IProductionComponent} from "@/types/components.types.ts";
import {ProductionService} from "@/services/production.service.ts";

export const useProductionStore = defineStore('ProductionStore', () => {

  const productionRobotData = ref<IProductionRobot>()
  const productionComponents = ref<IProductionComponent[]>();


  const changeProductionRobot = async () => {
    try{
      const {data} = await ProductionService.changeProductionRobot(productionRobotData.value!.type, productionRobotData.value!.stabilizer);
      console.log(data);
      productionRobotData.value = data.data.robot;
      console.log(productionRobotData.value)
      productionComponents.value = data.data.components;
      console.log(productionComponents.value)
    }catch(err){
      console.log(err);
    }
  }

  const createProductionRobot = async () => {

  }

  const addProductionComponent = async () => {

  }

  const removeProductionComponent = async () => {

  }


  return {
    productionRobotData,
    productionComponents,

    changeProductionRobot,
    createProductionRobot,
    addProductionComponent,
    removeProductionComponent,
  }



})
