interface IComponent {
  _id: string,
  name: string,
}

export interface IMarketComponent extends IComponent {
  buyPrice: number,
  image: string
}

export interface IStorageComponent extends IComponent {
  sellPrice: number,
  count: number
}


export interface IProductionComponent extends IComponent {
  icons: string,
  setStatuses: boolean[],
}
