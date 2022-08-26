import styled from 'styled-components'

import React, { useEffect } from 'react'
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { useMethods } from 'react-use'

import { Box } from '@tidbits/react-tidbits'
import { SCHEME_LIGHT } from '@tidbits/react-tidbits/theme'

import { SteppedFormBody } from './body'
import { SteppedFormFooter } from './footer'
import { SteppedFormHeader } from './header'
import { Step, Stepped } from './types'

export type SteppedFormProps<FieldValues> = {
  dataTestId?: string
  prerequisiteStep?: Step<FieldValues>
  steps: Step<FieldValues>[]
  isLoading?: boolean
  contextValues: UseFormReturn<FieldValues>
  updatePersist: (newState: Partial<FieldValues>) => void
  onSubmit: SubmitHandler<FieldValues>
  onCancel: () => void
}

function createSteppedFormMethods<FieldValues extends Stepped>(
  state: FieldValues,
) {
  return {
    goto: (activeStep: number) => ({ ...state, activeStep }),
    next: () => ({ ...state, activeStep: state.activeStep + 1 }),
    back: () => ({ ...state, activeStep: state.activeStep - 1 }),
  }
}

export function SteppedForm<FieldValues extends Stepped>({
  dataTestId,
  prerequisiteStep,
  steps,
  isLoading,
  contextValues,
  updatePersist,
  onSubmit,
  onCancel,
}: SteppedFormProps<FieldValues>) {
  const { handleSubmit, getValues, watch } = contextValues
  const [state, methods] = useMethods(createSteppedFormMethods, {
    activeStep: getValues().activeStep,
  })
  const { activeStep } = state

  useEffect(() => {
    const subscription = watch((data) => {
      updatePersist(data as Partial<FieldValues>)
    })
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch])

  useEffect(() => {
    updatePersist(state as Partial<FieldValues>)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <FormProvider {...contextValues}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        name={dataTestId}
        data-testid={dataTestId}
      >
        <Container>
          <SteppedFormHeader<FieldValues>
            activeStep={activeStep}
            steps={steps}
            onClick={methods.goto}
          />
          <SteppedFormBody<FieldValues>
            activeStep={activeStep}
            prerequisiteStep={prerequisiteStep}
            steps={steps}
          />
          <SteppedFormFooter<FieldValues>
            activeStep={activeStep}
            prerequisiteStep={prerequisiteStep}
            steps={steps}
            back={methods.back}
            cancel={onCancel}
            next={methods.next}
            isLoading={isLoading}
          />
        </Container>
      </form>
    </FormProvider>
  )
}

const Container = styled(Box)`
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.colors.keyline};
  box-shadow: 0 0 10px
    ${({ theme: { colors } }) =>
      colors.SCHEME === SCHEME_LIGHT ? colors.keyline : 'black'};
`
