import { SentryRoute } from '@acs/shared-library/sentry'

import React from 'react'
import { Switch, RouteProps } from 'react-router-dom'

export type NonAnimatedRoutes = {
  prefix: string
  routes: RouteProps[]
}

export const NonAnimatedRoutes = ({ routes, prefix }: NonAnimatedRoutes) => {
  return (
    <Switch>
      {routes.map((route, index) => {
        const key = `route-${prefix}-${route.path ?? 'no-path'}-${index}`

        if (route.component) {
          return (
            <SentryRoute
              exact={route.exact}
              key={key}
              path={route.path}
              component={route.component}
            />
          )
        }

        return (
          <SentryRoute exact={route.exact} key={key} path={route.path}>
            {route.children}
          </SentryRoute>
        )
      })}
    </Switch>
  )
}
