import type {EResponseStatus} from "@/const/enums/responseStatus.enum.ts";

export interface IErrorResponse<T>{
  status: EResponseStatus,
  message: string,
  errors: []
  data: T
}
