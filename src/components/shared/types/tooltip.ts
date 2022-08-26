import { RefObject } from 'react'

export interface TooltipParams {
  ref: RefObject<HTMLDivElement>
  show: () => void
  hide: () => void
  isHidden: boolean
  setHidden: (isHidden: boolean) => void
}
