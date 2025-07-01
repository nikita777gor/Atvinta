export type TProductionRobotType = 'frontend' | 'design';
export type TProductionRobotStabilizer = 'male' | 'famale';

export interface IProductionRobot {
  _id: string,
  createPrice: number,
  images: {
    createdImg: string,
    canCreateImg: string,
    forbiddenCreateImg: string
  },
  stabilizer: TProductionRobotStabilizer,
  type: TProductionRobotType,
}

