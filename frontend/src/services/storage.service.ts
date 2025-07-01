import type {AxiosResponse} from "axios";
import type {IApiResponse} from "@/types/apiResponse.types.ts";
import type {IStorageComponent} from "@/types/components.types.ts";
import {$api} from "@/http";

export class StorageService {

  static buyStorageComponent(componentId: string):Promise<AxiosResponse<IApiResponse<IStorageComponent[]>>>{
    return $api.post(`/user/components/${componentId}`);
  }

  static sellStorageComponent(componentId: string):Promise<AxiosResponse<IApiResponse<IStorageComponent[]>>>{
    return $api.delete(`/user/components/${componentId}`);
  }

}
