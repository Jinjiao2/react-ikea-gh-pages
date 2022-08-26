export interface ITabMenuItem {
  title: string
  rootUrl: string
  isRootUrlEndsWith?: boolean
}

export enum TabMenuType {}

export const ResourcesTabMenuItems: ITabMenuItem[] = []

export const SparkTabMenuItems: ITabMenuItem[] = []

export const LakehouseTabMenuItems: ITabMenuItem[] = []
export function getTabMenuItems(type: TabMenuType): ITabMenuItem[] {
  let tabMenuItems: ITabMenuItem[] = []

  return tabMenuItems
}
