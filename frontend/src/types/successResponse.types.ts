import type {EResponseStatus} from "@/types/responseStatus.types.ts";

export interface ISuccessResponse<T>{
  status: EResponseStatus,
  message: string,
  data: T
}
