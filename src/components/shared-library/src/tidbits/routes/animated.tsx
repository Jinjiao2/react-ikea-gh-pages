import React from 'react'
import { TransitionGroup } from 'react-transition-group'

import { PageTransition } from '@acs/shared-library/tidbits/page-transition'

import { NonAnimatedRoutes } from './non-animated'

export type AnimatedRoutes = NonAnimatedRoutes & {
  animatedTransition?: boolean
}

export const AnimatedRoutes = ({ prefix, routes }: AnimatedRoutes) => {
  return (
    <TransitionGroup component={null}>
      <PageTransition key={prefix} in>
        <NonAnimatedRoutes prefix={prefix} routes={routes} />
      </PageTransition>
    </TransitionGroup>
  )
}
