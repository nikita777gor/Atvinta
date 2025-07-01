import type {TApiStatus} from "@/const/api/apiStatus.ts";

export interface IApiResponse<T>{
  status: TApiStatus,
  message: string,
  data: T
}
