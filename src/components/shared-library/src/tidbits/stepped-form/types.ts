import { ReactElement } from 'react'

export type Step<FieldValues> = {
  key: string
  skippable?: boolean
  fields?: Array<keyof FieldValues>
  children: ReactElement
  submitText?: string
}

export type Stepped = {
  activeStep: number
}
