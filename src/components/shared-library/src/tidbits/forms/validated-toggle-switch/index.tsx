import { ErrorMessage } from '@hookform/error-message'
import styled, { FlattenSimpleInterpolation } from 'styled-components'

import React, { ChangeEvent } from 'react'
import { useFormContext, get } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types'

import { InfoTooltip, Text } from '@tidbits/react-tidbits'
import { Label } from '@tidbits/react-tidbits/Form'
import { ToggleSwitch } from '@tidbits/react-tidbits/Input'

import { SystemInputTextProps } from '@acs/shared-library/tidbits/react-tidbits'

import { ValidationError } from '../validation-error'

interface Props extends SystemInputTextProps {
  label: string
  name: string
  hint?: string | JSX.Element
  styleOverrides?: {
    container?: FlattenSimpleInterpolation
    title?: FlattenSimpleInterpolation
    error?: FlattenSimpleInterpolation
  }
  validationOptions?: RegisterOptions
  disabled?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  showErrorMessage?: boolean
}

export const ValidatedToggleSwitch = ({
  label,
  hint,
  name,
  styleOverrides,
  validationOptions,
  showErrorMessage = false,
  ...rest
}: Props): JSX.Element => {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext()
  const input = register(name as `${string}`, validationOptions)

  const showErrors = !!get(touchedFields, name) && !!get(errors, name)

  return (
    <ValidatedContainer
      textStyle='h6Regular'
      styleOverrides={styleOverrides?.container}
      pb='spacer15'
      showErrorMessage={showErrorMessage}
    >
      <Title
        as={Label}
        textStyle='h6Regular'
        my='unset'
        color='label'
        styleOverrides={styleOverrides?.title}
        gap='4px'
      >
        {label}
        {hint && (
          <InfoTooltip>
            <InfoTooltip.Content>
              {typeof hint === 'string' ? (
                <Text textStyle='bodyRegular'>{hint}</Text>
              ) : (
                hint
              )}
            </InfoTooltip.Content>
          </InfoTooltip>
        )}
        <Switch
          as={ToggleSwitch}
          {...rest}
          {...input}
          onClick={(e: ChangeEvent<HTMLInputElement>) => {
            input.onChange(e)
            rest.onChange && rest.onChange(e)
          }}
        />
      </Title>
      {showErrors && (
        <ErrorMessage
          errors={errors}
          name={name}
          as={<ValidationError styleOverrides={styleOverrides?.error} />}
        />
      )}
    </ValidatedContainer>
  )
}

const ValidatedContainer = styled(Label)`
  display: grid;
  grid-template-rows: 20px ${(props) => (props.showErrorMessage ? '20px' : '0')};
  ${(props) => props.styleOverrides}
`

const Title = styled(Label)`
  display: flex;
  ${(props) => props.styleOverrides}
`

const Switch = styled(ToggleSwitch)`
  margin-left: 10px;
`
