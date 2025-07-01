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

export interface IProductionComponent{
  _id: string,
  icons: {
    selectedIcon: string,
    inStockIcon: string,
    outStockIcon: string
  }
  count: number,
  maxCount: number
}
