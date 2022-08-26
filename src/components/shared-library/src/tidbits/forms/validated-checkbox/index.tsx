import { ErrorMessage } from '@hookform/error-message'
import styled, { FlattenSimpleInterpolation } from 'styled-components'

import React, { Fragment, ReactNode } from 'react'
import { useFormContext, get, Controller } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types'

import { Box, InfoTooltip, Text } from '@tidbits/react-tidbits'
import { Label } from '@tidbits/react-tidbits/Form'
import { Checkbox } from '@tidbits/react-tidbits/Input'

import { ValidationError } from '../validation-error'

interface Props {
  label: string
  hint?: string
  name: string
  styleOverrides?: Partial<{
    container?: FlattenSimpleInterpolation
    title?: FlattenSimpleInterpolation
    error?: FlattenSimpleInterpolation
  }>
  description?: ReactNode
  validationOptions?: RegisterOptions
  width?: string
  disabled?: boolean
  validateOnlyTouched?: boolean
  showErrorMessage?: boolean
  onChange?: (value: boolean) => void
}

export const ValidatedCheckbox = ({
  label,
  hint,
  name,
  styleOverrides,
  description,
  validationOptions,
  width,
  onChange,
  validateOnlyTouched = true,
  showErrorMessage = true,
}: Props): JSX.Element => {
  const {
    formState: { errors, touchedFields },
    control,
  } = useFormContext()

  const showErrors =
    (!validateOnlyTouched || !!get(touchedFields, name)) && !!get(errors, name)

  return (
    <ValidatedContainer
      textStyle='h6Regular'
      styleOverrides={styleOverrides?.container}
      width={width}
      pb='spacer15'
      showErrorMessage={showErrorMessage}
    >
      <Box display='flex' gap='4px'>
        <Title
          as='div'
          textStyle='h6Regular'
          my='unset'
          color='label'
          styleOverrides={styleOverrides?.title}
        >
          {label}
        </Title>
        {hint && (
          <InfoTooltip>
            <InfoTooltip.Content>
              <Text textStyle='bodyRegular'>{hint}</Text>
            </InfoTooltip.Content>
          </InfoTooltip>
        )}
        <Controller
          rules={validationOptions}
          render={({ field: { onChange: onChangeBase, value } }) => {
            return (
              <Fragment>
                <Checkbox
                  mt='spacer5'
                  onChange={(val: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeBase(val)
                    onChange?.(val.target.checked)
                  }}
                  value={value}
                  checked={!!value}
                />
              </Fragment>
            )
          }}
          name={name}
          control={control}
        />
      </Box>
      {showErrors && (
        <ErrorMessage
          errors={errors}
          name={name}
          as={<ValidationError styleOverrides={styleOverrides?.error} />}
        />
      )}
      {description}
    </ValidatedContainer>
  )
}

const ValidatedContainer = styled(Label)`
  display: grid;
  grid-template-rows: 20px ${(props) => (props.showErrorMessage ? '20px' : '0')};
  ${(props) => props.styleOverrides}
`

const Title = styled(Text)`
  ${(props) => props.styleOverrides}
`
