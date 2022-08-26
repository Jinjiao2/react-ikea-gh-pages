import styled from 'styled-components'

import React, { FC, useCallback, useRef, useState } from 'react'
import { useEffectOnce } from 'react-use'

import { Box } from '@tidbits/react-tidbits'

export const Scrollable: FC = ({ children }) => {
  const scrollableContainerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isShadow, setIsShadow] = useState(false)

  const reinitializeShadowBox = useCallback(() => {
    const scrollableContainer = scrollableContainerRef?.current

    if (!scrollableContainer) {
      return
    }
    if (
      scrollableContainer.scrollHeight > scrollableContainer.clientHeight &&
      !isShadow
    ) {
      setIsShadow(true)
    } else if (
      scrollableContainer.scrollHeight <= scrollableContainer.clientHeight
    ) {
      setIsShadow(false)
    }
  }, [scrollableContainerRef])

  useEffectOnce(() => {
    const scrollableContainer = scrollableContainerRef?.current
    if (!scrollableContainer) {
      return
    }
    reinitializeShadowBox()
    const mutationObserver = new MutationObserver(reinitializeShadowBox)
    mutationObserver.observe(scrollableContainer, {
      childList: true,
      subtree: true,
    })

    scrollableContainer.addEventListener('scroll', setFade)

    return () => {
      mutationObserver.disconnect()
      scrollableContainer.removeEventListener('scroll', setFade)
    }
  })

  const isScrolledToBottom = useCallback((element: HTMLDivElement) => {
    return element.scrollHeight - element.scrollTop - element.clientHeight === 0
  }, [])

  const setFade: EventListener = (event) => {
    const element = event.target as HTMLDivElement
    if (!isScrolling) {
      window.requestAnimationFrame(function () {
        if (isScrolledToBottom(element)) {
          setIsShadow(false)
        } else {
          setIsShadow(true)
        }
        setIsScrolling(false)
      })
      setIsScrolling(true)
    }
  }

  return (
    <ScrollableContainer>
      <ScrollableBox ref={scrollableContainerRef}>{children}</ScrollableBox>
      <ShadowBox className={isShadow ? 'shadow' : ''} />
    </ScrollableContainer>
  )
}

const ScrollableContainer = styled.div`
  height: 100%;
  position: relative;
`
const ScrollableBox = styled(Box)`
  height: 100%;
  overflow-y: scroll;
  padding-right: 12px;
`

const ShadowBox = styled.div`
  height: 40px;
  bottom: 0;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  transition: all 0.2s ease-out;

  &.shadow {
    box-shadow: ${(props) =>
      `0 -20px 20px -10px ${props.theme.colors.keyline} inset`};
  }
`
