import {defineStore} from "pinia";
import {ref, watch} from "vue";

import type {IProductionRobot} from "@/types/production.types.ts";
import type {IProductionComponent} from "@/types/components.types.ts";
import {ProductionService} from "@/services/production.service.ts";

import { useStorageStore } from "./StorageStore";
import {useCoinsStore} from "@/stores/CoinsStore.ts";
import {useWindowStore} from "@/stores/WindowStore.ts";

export const useProductionStore = defineStore('ProductionStore', () => {

  const storageStore = useStorageStore();
  const coinsStore = useCoinsStore();
  const windowStore = useWindowStore();

  const productionPreloaderStatus = ref<boolean>(false);

  const productionRobotData = ref<IProductionRobot>()
  const productionComponents = ref<IProductionComponent[]>([]);


  // Переиспользуемые методы для удобства
  const getProductionComponentIndex = (componentId: string):number => {
    const index = productionComponents.value.findIndex((component) => {
      return component._id === componentId;
    })
    if(index === -1) throw new Error("Ошибка нахождения компонента");
    return index;
  }

  const getProductionComponentCount = (componentSetStatuses: boolean[]):number => {
    return componentSetStatuses.reduce((acc, status) => {
      if(status){
        return acc + 1;
      }
      return acc;
    }, 0)

  }
  // Возвращение комплектующих в хранилище
  const returnProductionComponents = () => {
    for(let component of productionComponents.value){
      const componentCount = getProductionComponentCount(component.setStatuses);
      storageStore.changeStorageComponentCount(component._id, componentCount);
    }
  }
  const clearProductionComponents = () => {
    for(let component of productionComponents.value){
      component.setStatuses = new Array<boolean>(component.setStatuses.length).fill(false);
    }
  }

  const checkCanCreateProduction = () => {
    if(!productionRobotData.value) return false;
    for(let component of productionComponents.value){
      if(component.setStatuses.includes(false)) return false;
    }
    if(coinsStore.coinsCount < productionRobotData.value.createPrice){
      return false;
    }
    return true;
  }




  const changeProductionRobot = async () => {
    try{
      if(!productionRobotData.value) throw Error;
      productionPreloaderStatus.value = true;

      // Возвращение компонентов в хранилище при смене вида робота
      returnProductionComponents()

      const {data} = await ProductionService.changeProductionRobot(productionRobotData.value.type, productionRobotData.value.stabilizer);

      productionRobotData.value = data.data.robot;
      productionComponents.value = data.data.components;
    }catch(err){
      console.log(err);
    }finally {
      productionPreloaderStatus.value = false;
    }
  }

  const createProductionRobot = async () => {
    try{
      if(!productionRobotData.value) throw Error;
      if(!checkCanCreateProduction()){
        throw new Error('Не хватает элементов для создания робота')
      }

      productionPreloaderStatus.value = true;
      await ProductionService.createProductionRobot();
      clearProductionComponents();

      windowStore.showWindow({
        title: 'Биоробот произведен',
        description: 'Поздравляем!\n' + 'Вы произвели биоробота'
      })

    }catch(err){
      console.log(err);
    }finally {
      productionPreloaderStatus.value = true;
    }
  }

  const addProductionComponent = async (componentId: string, setStatusIndex: number) => {
    try{
      storageStore.changeStorageComponentCount(componentId, -1);
      const componentIndex:number = getProductionComponentIndex(componentId);
      productionComponents.value[componentIndex].setStatuses[setStatusIndex] = true;
      const {data} = await ProductionService.addProductionComponent(componentId);
      console.log(data);

    }catch(err){
      console.log(err);
    }
  }

  const removeProductionComponent = async (componentId: string, setStatusIndex: number) => {
    try{
      storageStore.changeStorageComponentCount(componentId, 1);
      const componentIndex:number = getProductionComponentIndex(componentId);
      productionComponents.value[componentIndex].setStatuses[setStatusIndex] = false;
      const {data} = await ProductionService.removeProductionComponent(componentId);
      console.log(data);
    }catch(err){
      console.log(err);
    }
  }


  return {
    productionPreloaderStatus,
    productionRobotData,
    productionComponents,

    getProductionComponentCount,
    checkCanCreateProduction,

    changeProductionRobot,
    createProductionRobot,
    addProductionComponent,
    removeProductionComponent,
  }



})
