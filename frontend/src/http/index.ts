import axios from 'axios';

import type { AxiosInstance } from "axios";
import {UserService} from "@/services/user.service.ts";
import {API_URL} from "@/const/api/apiUrl.const.ts";

import {useWindowStore} from "@/stores/WindowStore.ts";

export const $api:AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true
});


$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
})

$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {

  const windowStore = useWindowStore();

  if(error.response.status === 400){
    windowStore.showWindow({
      img: '/icons/apiError.png',
      title: 'Ошибка работы с сервером',
      description: 'Не корректное соединение или слишком много запросов, обновите страницу и проверьте скорость подключения к интернету'
    })
    throw error;
  }

  const originalRequest = error.config;
  if(error.response.status !== 401){
    throw error;
  }
  if(originalRequest.isRetry){
    throw error;
  }

  try{
    originalRequest.isRetry = true;
    const {data} = await UserService.authUser();
    console.log(data);
    localStorage.setItem('token', data.data.token);
    return $api.request(originalRequest)


  }catch(err){
    throw error;
  }

})
