import type {IProductionComponent, IStorageComponent} from "@/types/components.types.ts";
import type {IProductionRobot} from "@/types/production.types.ts";


export interface IUser {
  _id: string,
  coins: number,
  production: {
    components: IProductionComponent[],
    robot: IProductionRobot
  },
  storage: IStorageComponent[]
  createdAt: Date,
  updatedAt: Date,
}

export type IUserToken = {
  token: string
};
