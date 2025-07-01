import {$api} from "@/http";
import type {TProductionRobotStabilizer, TProductionRobotType} from "@/types/production.types.ts";

export class ProductionService {

  static changeProductionRobot(type: TProductionRobotType, stabilizer: TProductionRobotStabilizer){
    return $api.put('/user/production/robot', {type, stabilizer});
  }

  static createProductionRobot(){
    return $api.post('/user/production/robot');
  }

  static addProductionComponent(componentId: string){
    return $api.post(`/user/production/components/${componentId}`);
  }

  static removeProductionComponent(componentId: string){
    return $api.delete(`/user/production/components/${componentId}`);
  }

}
