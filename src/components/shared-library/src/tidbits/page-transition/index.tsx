import React from 'react'
import { Transition } from 'react-transition-group'

const enterDuration = 500
const exitDuration = 150

const defaultStyle = {
  transition: `opacity ${enterDuration}ms ease-in-out`,
  opacity: 1,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

type PageTransitionProps = {
  key: string
  in: boolean
  children: React.ReactNode
}

export const PageTransition = ({
  key,
  in: inProp,
  children,
}: PageTransitionProps) => (
  <Transition
    key={key}
    appear
    in={inProp}
    timeout={{ enter: enterDuration, exit: exitDuration }}
  >
    {(state) => (
      <div
        style={{
          ...defaultStyle,
          ...(transitionStyles as any)[state],
        }}
      >
        {children}
      </div>
    )}
  </Transition>
)
