import { RouteProps } from 'react-router-dom'

export type RoutePropsWithMenu = RouteProps & {
  sideMenu?: boolean
}
