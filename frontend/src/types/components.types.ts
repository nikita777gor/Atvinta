interface IComponent {
  _id: string,
  name: string,
}

export interface IMarketComponent extends IComponent {
  buyPrice: number,
  image: string
}

export interface IUserComponent extends IComponent {
  sellPrice: number
}
