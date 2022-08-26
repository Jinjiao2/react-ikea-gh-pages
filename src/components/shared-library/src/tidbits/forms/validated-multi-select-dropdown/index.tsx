import { ErrorMessage } from '@hookform/error-message'
import get from 'lodash/get'
import styled, { css } from 'styled-components'

import React, { Fragment, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types'

import {
  Box,
  InlineSpinner,
  Input,
  InfoTooltip,
  Text,
} from '@tidbits/react-tidbits'

import {
  InputChipsProps,
  InputVariant,
} from '@acs/shared-library/tidbits/react-tidbits'

import { ValidationError } from '../validation-error'

interface Props<T> extends InputChipsProps<T> {
  'data-testid': string
  description?: ReactNode
  disabled?: boolean
  id: string
  isLoading?: boolean
  name: string
  options?: any[]
  title?: React.ReactChild | string
  hint?: string
  validationOptions?: RegisterOptions
  variant?: InputVariant
  autocompleteOnly?: boolean
  placeholder?: string
  chipWidth?: string
  dropdownProps?:
    | {
        height?: string | undefined
        width?: string | undefined
        target: any
        children: any
      }
    | undefined
  menuListProps?: { height?: string; width?: string; maxHeight?: string }
  validateOnlyTouched?: boolean
  showErrorMessage?: boolean
}

export function ValidatedMultiSelectDropdown<SelectDropdownType>({
  'data-testid': dataTestId,
  description,
  disabled,
  id,
  isLoading,
  name,
  options,
  hint,
  title,
  validationOptions,
  variant,
  autocompleteOnly = false,
  placeholder,
  chipWidth = '100%',
  dropdownProps = {},
  menuListProps = {},
  validateOnlyTouched = true,
  showErrorMessage = true,
  ...rest
}: Props<SelectDropdownType>): JSX.Element {
  const {
    control,
    formState: { errors, touchedFields },
  } = useFormContext()

  const showErrors =
    (!validateOnlyTouched || !!get(touchedFields, name)) && !!get(errors, name)
  const isRequired = validationOptions?.required
  const renderOptions = () => {
    return options?.map((option: any) => {
      return (
        <option key={option?.value} value={option?.value}>
          {option?.label}
          {option?.subtext && (
            <Text textStyle='bodyXsRegular' color='labelCaption' my='spacer5'>
              {option?.subtext}
            </Text>
          )}
        </option>
      )
    })
  }

  return (
    <Fragment>
      <ValidatedContainer showErrorMessage={showErrorMessage}>
        <Box display='flex' gap='8px'>
          <Title
            as='div'
            textStyle='h6Regular'
            my='unset'
            isRequired={isRequired}
          >
            {title}
          </Title>
          {hint && (
            <InfoTooltip>
              <InfoTooltip.Content>
                <Text textStyle='bodyRegular'>{hint}</Text>
              </InfoTooltip.Content>
            </InfoTooltip>
          )}
        </Box>
        <Box as='div'>
          <Controller
            render={({ field, fieldState }) => (
              <Chips
                {...rest}
                {...field}
                {...fieldState}
                ref={undefined /* Remove ref passed by useForm through field */}
                name={name}
                showDropdownIfNoResults
                id={id}
                disabled={disabled}
                data-testid={dataTestId}
                variant={variant}
                autocompleteOnly={autocompleteOnly}
                placeholder={placeholder}
                width={chipWidth}
                dropdownProps={dropdownProps}
                menuListProps={{
                  ...menuListProps,
                  'data-testid': `${dataTestId}-menu`,
                }}
              >
                {renderOptions()}
              </Chips>
            )}
            name={`${name}` as const}
            control={control}
            rules={validationOptions}
          />
          <InlineSpinner visible={isLoading} />
        </Box>
        {showErrors && (
          <ErrorMessage errors={errors} name={name} as={<ValidationError />} />
        )}
        {description && (
          <Text textStyle='bodySmallMedium' mt='spacer5'>
            {description}
          </Text>
        )}
      </ValidatedContainer>
    </Fragment>
  )
}

const ValidatedContainer = styled(Box)`
  display: grid;
  grid-template-rows: 20px auto ${(props) =>
      props.showErrorMessage ? '20px' : '0'};
`

const Chips = styled(Input.Chips)`
  margin-top: 6px;
  padding-left: 0;

  &:focus-within {
    outline: none;
    border-color: ${({ theme: { colors } }) => colors.ctrlHover};
    box-shadow: 0 0 0 3px rgba(95, 171, 254, 0.55);
  }

  input {
    margin-left: 0;
  }

  input:focus {
    box-shadow: none;
  }
`

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
