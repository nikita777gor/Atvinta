import {$api} from "@/http";

import type {
  IProductionRobot,
  TProductionRobotStabilizer,
  TProductionRobotType
} from "@/types/production.types.ts";
import type {AxiosResponse} from "axios";
import type {IApiResponse} from "@/types/apiResponse.types.ts";
import type {IProductionComponent} from "@/types/components.types.ts";

export class ProductionService {

  static changeProductionRobot(type: TProductionRobotType, stabilizer: TProductionRobotStabilizer)
    :Promise<AxiosResponse<IApiResponse<{robot: IProductionRobot, components: IProductionComponent[]}>>>{
    return $api.put('/user/production/robot', {type, stabilizer});
  }

  static createProductionRobot():Promise<AxiosResponse<IApiResponse<IProductionRobot>>>{
    return $api.post('/user/production/robot');
  }

  static addProductionComponent(componentId: string):Promise<AxiosResponse<IApiResponse<IProductionComponent[]>>>{
    return $api.post(`/user/production/components/${componentId}`);
  }

  static removeProductionComponent(componentId: string):Promise<AxiosResponse<IApiResponse<IProductionComponent[]>>>{
    return $api.delete(`/user/production/components/${componentId}`);
  }

}
