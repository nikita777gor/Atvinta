import {defineStore} from "pinia";
import {ref} from "vue";
import {UserService} from "@/services/user.service.ts";

export const useUserStore = defineStore('UserStore', () => {

  const userData = ref();

  const getUserData = async () => {
    try{
      const {data} = await UserService.getUser();
      console.log(data);
      userData.value = data;
    }catch(err){
      console.log(err);
    }
  }

  return {
    userData,
    getUserData
  }

})
