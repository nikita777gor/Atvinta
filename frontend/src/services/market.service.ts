import type {AxiosResponse} from "axios";
import type {IApiResponse} from "@/types/apiResponse.types.ts";
import type {IMarketComponent} from "@/types/components.types.ts";

import {$api} from "@/http";

export class MarketService {

  static getMarket():Promise<AxiosResponse<IApiResponse<IMarketComponent[]>>>{
    return $api.get('/components');
  }

}
