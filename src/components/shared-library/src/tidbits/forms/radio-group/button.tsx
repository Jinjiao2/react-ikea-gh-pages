import isFunction from 'lodash/isFunction'
import styled from 'styled-components'

import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  FC,
  ChangeEvent,
} from 'react'
import { useFormContext, UseFormRegisterReturn } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form'

import { Label } from '@tidbits/react-tidbits/Form'

type RadioButtonVariants =
  | {
      variant: 'default'
      children: string
    }
  | {
      variant: 'card'
      children: ReactNode
    }

export type RadioButtonProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
> &
  Partial<RadioButtonVariants> & {
    selectedValue?: string
    validationOptions?: RegisterOptions
  }

export const RadioButton: FC<RadioButtonProps> = ({
  children,
  name,
  variant = 'default',
  className,
  selectedValue,
  value,
  disabled,
  validationOptions,
  ...rest
}: RadioButtonProps): JSX.Element => {
  const formContext = useFormContext()
  const input = formContext
    ? formContext.register(
        name,
        validationOptions ? validationOptions : { required: true },
      )
    : ({} as Partial<UseFormRegisterReturn>)

  return variant === 'default' ? (
    <Label
      as='label'
      display='inline-block'
      layout='horizontal'
      className={className}
      textStyle='bodyRegular'
    >
      <Input
        {...rest}
        type='radio'
        value={value}
        disabled={disabled}
        tabIndex={0}
        checked={selectedValue === value && !disabled}
        {...(input as UseFormRegisterReturn)}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          isFunction(input.onChange) && input.onChange(e)
          isFunction(rest.onChange) && rest.onChange(e)
        }}
      />
      {children}
    </Label>
  ) : (
    <Card
      as='label'
      borderColor='keyline'
      border='1px solid'
      backgroundColor={disabled ? 'ctrlDisabled' : 'bg'}
      opacity={disabled ? '0.5' : '1'}
      tabIndex={disabled ? undefined : 0}
      selected={selectedValue === value}
      focusable={!disabled}
      textStyle='bodyRegular'
    >
      <Input
        {...rest}
        type='radio'
        value={value}
        disabled={disabled}
        hidden
        aria-hidden='true'
        {...(input as UseFormRegisterReturn)}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          isFunction(input.onChange) && input.onChange(e)
          isFunction(rest.onChange) && rest.onChange(e)
        }}
      />
      {children}
    </Card>
  )
}

const Input = styled.input`
  cursor: pointer;
  margin-right: 8px;
`

const Card = styled(Label)`
  align-items: center;
  border-radius: 4px;
  display: flex;
  flex-flow: column nowrap;
  padding: 16px 0;
  box-shadow: ${(props) => {
    return props.selected ? `0 0 0 2px ${props.theme.colors.label}` : 'none'
  }};
  &:focus {
    box-shadow: ${(props) =>
      props.focusable ? `0 0 0 2px ${props.theme.colors.ctrl}` : 'none'};
    outline: none;
  }
`
