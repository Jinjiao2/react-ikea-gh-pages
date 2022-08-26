export type AppPortKey = keyof typeof APP_PORTS

export const APP_PORTS = {
  shell: 3001,
  ikeas: 3003,
}

export const PORTS = {
  ...APP_PORTS,
  graphql_gateway: 3030,
}
