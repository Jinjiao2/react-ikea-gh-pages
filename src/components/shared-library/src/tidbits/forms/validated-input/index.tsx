import { ErrorMessage } from '@hookform/error-message'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

import React, { ChangeEvent, ReactNode } from 'react'
import { useFormContext, get } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types'

import { Box, InfoTooltip, Text } from '@tidbits/react-tidbits'
import { Label } from '@tidbits/react-tidbits/Form'
import { Text as TextInput } from '@tidbits/react-tidbits/Input'

import { SystemInputTextProps } from '@acs/shared-library/tidbits/react-tidbits'

import { ValidationError } from '../validation-error'

interface Props extends SystemInputTextProps {
  autoComplete?: string
  autoFocus?: boolean
  label: string
  hint?: string | JSX.Element
  name: string
  defaultValue?: string
  styleOverrides?: Partial<{
    container?: FlattenSimpleInterpolation
    title?: FlattenSimpleInterpolation
    input?: FlattenSimpleInterpolation
    error?: FlattenSimpleInterpolation
  }>
  description?: ReactNode
  placeholder?: string
  validationOptions?: RegisterOptions
  width?: string
  disabled?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onInput?: (event: ChangeEvent<HTMLInputElement>) => void
  validateOnlyTouched?: boolean
  readOnly?: boolean
  type?: string
  showErrorMessage?: boolean
}

export const ValidatedInput = ({
  autoComplete = 'off',
  autoFocus = false,
  label,
  hint,
  name,
  defaultValue,
  styleOverrides,
  description,
  placeholder,
  validationOptions,
  width,
  readOnly,
  type = 'text',
  validateOnlyTouched = true,
  showErrorMessage = true,
  ...rest
}: Props): JSX.Element => {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext()
  const input = register(name, validationOptions)

  const showErrors =
    (!validateOnlyTouched || !!get(touchedFields, name)) && !!get(errors, name)
  const isRequired = validationOptions?.required
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
          isRequired={isRequired}
          wordBreak='break-all'
        >
          {label}
        </Title>
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
      </Box>
      <Box>
        <Input
          as={TextInput}
          defaultValue={defaultValue}
          type={type}
          {...rest}
          autoComplete={autoComplete}
          autoCorrect='off'
          autoFocus={autoFocus}
          styleOverrides={styleOverrides?.input}
          placeholder={placeholder}
          spellCheck='false'
          variant={showErrors ? 'error' : ''}
          {...input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (readOnly) {
              return
            }
            input.onChange(e)
            rest.onChange && rest.onChange(e)
          }}
          readOnly={readOnly}
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
  grid-template-rows: 20px 36px ${(props) =>
      props.showErrorMessage ? '20px' : '0'};
  ${(props) => props.styleOverrides}
`

const MandatorySign = css`
  display: inline-block;
  margin-right: 4px;
  color: ${({ theme: { colors } }) => colors.error};
  content: '*';
`

const Title = styled(Text)`
  ${(props) => props.styleOverrides}

  &:before {
    ${(props) => (props.isRequired ? MandatorySign : '')}
  }
`

const ReadOnlyInputStyle = css`
  cursor: not-allowed;
  background-color: ${({ theme: { colors } }) => colors.bgPlaceholder};

  &:focus-visible {
    box-shadow: none;
    border-color: ${({ theme: { colors } }) => colors.keyline};
  }
`

const Input = styled(TextInput)`
  ${(props) => (props.readOnly ? ReadOnlyInputStyle : '')}
  ${(props) => props.styleOverrides}
`
