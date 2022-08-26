import React from 'react'

import { AnimatedRoutes } from './animated'
import { NonAnimatedRoutes } from './non-animated'

export type RoutesListProps = AnimatedRoutes

export const RoutesList = ({
  animatedTransition = false,
  prefix,
  routes,
}: RoutesListProps) => {
  return animatedTransition ? (
    <AnimatedRoutes prefix={prefix} routes={routes} />
  ) : (
    <NonAnimatedRoutes prefix={prefix} routes={routes} />
  )
}
