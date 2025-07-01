import {defineStore} from "pinia";
import {ref} from "vue";

import type {IProductionRobot} from "@/types/production.types.ts";
import type {IProductionComponent} from "@/types/components.types.ts";

export const useProductionStore = defineStore('ProductionStore', () => {

  const productionRobotData = ref<IProductionRobot | null>(null)
  const productionComponents = ref<IProductionComponent[]>();




  return {
    productionRobotData,
    productionComponents,
  }



})
