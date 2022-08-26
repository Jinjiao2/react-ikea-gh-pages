interface projectInterface {
  id: string
}

export interface projectrolepermissionInterface {
  project: projectInterface
  roles: [rolesInterface]
}

export interface rolesInterface {
  name: string
  permissions: [permissionsInterface]
}

export interface permissionsInterface {
  code: string
}
