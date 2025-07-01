import type {AxiosResponse} from "axios";
import type {IApiResponse} from "@/types/apiResponse.types.ts";
import {$api} from "@/http";

export class CoinsService {

  static changeCoinsCount(coins: number):Promise<AxiosResponse<IApiResponse<{ coins: number }>>>{
    return $api.patch('/user/coins', {coins})
  }

}
