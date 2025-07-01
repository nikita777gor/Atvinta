import {$api} from "@/http";
import type {AxiosResponse} from "axios";
import type {IApiResponse} from "@/types/apiResponse.types.ts";
import type {IUser, IUserToken} from "@/types/user.types.ts";

export class UserService {

  static getUser():Promise<AxiosResponse<IApiResponse<IUser>>>{
    return $api.get('/user');
  }

  static authUser():Promise<AxiosResponse<IApiResponse<IUserToken>>>{
    return $api.get('/user/auth');
  }

}
