import {$api} from "@/http";

export class UserService {

  static getUser(){
    return $api.get('/user');
  }

  static authUser(){
    return $api.get('/user/auth');
  }

}
