export interface IItem {
  title: string
  url: string
  isExactPath?: boolean
  externalUrl?: string
}

export interface IMenuItem {
  title: string
  rootUrl: string
  items: IItem[]
}

export enum PageMenuType {
  PROJECTS = 'PROJECTS',
  RESOURCES = 'RESOURCES',
  TEAMS = 'TEAMS',
  OTHER = 'OTHER',
  CLUSTERS = 'RESOURCES/CLUSTERS', //TODO: make special page types for children of resources page
}

export const ProjectMenuItems: IMenuItem[] = []

export const SecretsMenuItems: IMenuItem[] = []

export const SparkMenuItems: IMenuItem[] = []

export const ClustersMenuItems: IMenuItem[] = []

export const ikeasettingsMenuItems: IMenuItem[] = [
  {
    title: '',
    rootUrl: '',
    items: [
      {
        title: 'Basic Info',
        url: '/basic-info',
      },
      {
        title: 'Catalogs',
        url: '/catalogs',
      },
      {
        title: 'Contact',
        url: '/contact',
      },
      {
        title: 'Configuration',
        url: '/configuration',
      },
      {
        title: 'Access Control',
        url: '/access-control',
      },
      {
        title: 'Admin',
        url: '/admin',
      },
    ],
  },
]

export enum SectionMenuType {
  PROJECT = 'PROJECT',
  SECRETS = 'SECRETS',
  SPARK = 'SPARK',
  RESOURCES = 'RESOURCES',
  CLUSTERS = 'CLUSTERS',
  LAKEHOUSE = 'LAKEHOUSE',
}

export function getSectionMenuItems(type: SectionMenuType): IMenuItem[] {
  let sectionMenuItems: IMenuItem[] = []

  switch (type) {
    case SectionMenuType.PROJECT:
      sectionMenuItems = ProjectMenuItems
      break
    case SectionMenuType.SECRETS:
      sectionMenuItems = SecretsMenuItems
      break
    case SectionMenuType.SPARK:
      sectionMenuItems = SparkMenuItems
      break
    case SectionMenuType.CLUSTERS:
      sectionMenuItems = ClustersMenuItems
      break
    case SectionMenuType.LAKEHOUSE:
      sectionMenuItems = ikeasettingsMenuItems
      break
  }
  return sectionMenuItems.reduce((acc: IMenuItem[], menuItem: IMenuItem) => {
    const items = menuItem.items
    return [...acc, { ...menuItem, items }]
  }, [])
}
