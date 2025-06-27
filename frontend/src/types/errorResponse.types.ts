import type {EResponseStatus} from "@/types/responseStatus.types.ts";

export interface IErrorResponse<T>{
  status: EResponseStatus,
  message: string,
  errors: []
  data: T
}
