import styled from 'styled-components'

import React from 'react'

import { Box } from '@tidbits/react-tidbits'

import { Step } from './types'

type SteppedFormBodyProps<FieldValues> = {
  steps: Step<FieldValues>[]
  activeStep: number
  prerequisiteStep?: Step<FieldValues>
}

export function SteppedFormBody<FieldValues>({
  activeStep,
  steps,
  prerequisiteStep,
}: SteppedFormBodyProps<FieldValues>) {
  return (
    <Container>
      {activeStep === -1 && prerequisiteStep
        ? prerequisiteStep.children
        : steps[activeStep].children}
    </Container>
  )
}

const Container = styled(Box)`
  padding: 20px 30px;
`
