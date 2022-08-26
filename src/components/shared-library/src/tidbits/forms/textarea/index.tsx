import { ErrorMessage } from '@hookform/error-message'
import isFunction from 'lodash/isFunction'
import styled, { css } from 'styled-components'

import React, { ChangeEvent, Fragment } from 'react'
import {
  Controller,
  useFormContext,
  UseFormRegisterReturn,
  get,
} from 'react-hook-form'

import { Input, Text } from '@tidbits/react-tidbits'

import { STRING } from '@acs/shared-library/tidbits/strings'

import { ValidationError } from '../validation-error'

interface TextAreaProps {
  title: string
  name: string
  placeholder: string
  isRequired?: boolean
  height?: string
  rows?: number
  validateOnlyTouched?: boolean
  showErrorMessage?: boolean
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea = ({
  title,
  name,
  height,
  placeholder,
  rows = 2,
  isRequired = false,
  handleChange,
  validateOnlyTouched = true,
}: TextAreaProps): JSX.Element => {
  const {
    formState: { errors, touchedFields },
  } = useFormContext()
  const formContext = useFormContext()
  const textarea = formContext
    ? formContext.register(name, {
        required: isRequired && STRING.getRequiredString(`${name}`),
      })
    : ({} as Partial<UseFormRegisterReturn>)
  const showErrors =
    (!validateOnlyTouched || !!get(touchedFields, name)) && !!get(errors, name)
  return (
    <Fragment>
      <Title textStyle='h6Regular' isRequired={isRequired}>
        {title}
      </Title>
      <Controller
        render={({ field }) => (
          <Input.TextArea
            sa='spacer10'
            {...textarea}
            {...field}
            placeholder={placeholder}
            rows={rows}
            height={height ?? '200px'}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              isFunction(textarea.onChange) && textarea.onChange(e)
              isFunction(handleChange) && handleChange(e)
            }}
          />
        )}
        control={formContext.control}
        name={name}
      />
      {showErrors && (
        <ErrorMessage errors={errors} name={name} as={<ValidationError />} />
      )}
    </Fragment>
  )
}
const MandatorySign = css`
  display: inline-block;
  margin-right: 4px;
  color: ${({ theme: { colors } }) => colors.error};
  content: '*';
`
const Title = styled(Text)`
  color: ${({ theme: { colors } }) => colors.label};
  &:before {
    ${(props) => (props.isRequired ? MandatorySign : '')}
  }
`
