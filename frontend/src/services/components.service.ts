import type {AxiosResponse} from "axios";
import type {ISuccessResponse} from "@/types/successResponse.types.ts";
import type {IMarketComponent} from "@/types/components.types.ts";

import {$api} from "@/http";

export class ComponentsService {

  static getMarket():Promise<AxiosResponse<ISuccessResponse<IMarketComponent[]>>>{
    return $api.get('/components');
  }

}
