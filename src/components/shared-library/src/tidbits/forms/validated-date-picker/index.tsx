import { ErrorMessage } from '@hookform/error-message'
import { format } from 'date-fns'
import styled, { FlattenSimpleInterpolation } from 'styled-components'

import React, { ChangeEvent, useCallback } from 'react'
import { useFormContext, get, Controller } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types'

import { Text, Box, InfoTooltip } from '@tidbits/react-tidbits'
import { Calendar, CalendarButton } from '@tidbits/react-tidbits-calendar'
import { Label } from '@tidbits/react-tidbits/Form'

import { SystemInputTextProps } from '@acs/shared-library/tidbits/react-tidbits'

import { ValidationError } from '../validation-error'
import { clearableSelection } from './clearable-selection'
import { extendedRanges } from './helper'

interface Props extends SystemInputTextProps {
  label: string
  name: string
  hint?: string | JSX.Element
  dateFormat?: string
  description?: string
  styleOverrides?: {
    container?: FlattenSimpleInterpolation
    title?: FlattenSimpleInterpolation
    error?: FlattenSimpleInterpolation
  }
  validationOptions?: RegisterOptions
  disabled?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  showErrorMessage?: boolean
  allowEmptyDate?: boolean
  enableTimePicker?: boolean
}

export const ValidatedDatePicker = ({
  label,
  name,
  hint,
  styleOverrides,
  validationOptions,
  dateFormat = 'yyyy-MM-dd',
  description = 'Select Date',
  showErrorMessage = false,
  allowEmptyDate = false,
  enableTimePicker = false,
  ...rest
}: Props): JSX.Element => {
  const {
    formState: { errors, touchedFields },
  } = useFormContext()

  const showErrors = !!get(touchedFields, name) && !!get(errors, name)

  const getCalendarConfig = useCallback(
    (value: string) => {
      const val = value ? new Date(value) : new Date()
      const navItems = enableTimePicker
        ? {
            timePicker: {
              name: 'Time Picker',
              component: clearableSelection({
                enableTimePicker,
                allowEmptyDate,
              }),
            },
          }
        : {
            dayPicker: {
              name: 'Day Picker',
              component: clearableSelection({
                enableTimePicker,
                allowEmptyDate,
              }),
            },
          }
      return {
        date: allowEmptyDate && !value ? '' : val,
        navItems,
        ranges: extendedRanges,
        range: enableTimePicker ? 'timePicker' : 'dayPicker',
      }
    },
    [allowEmptyDate, enableTimePicker],
  )

  return (
    <ValidatedContainer
      textStyle='h6Regular'
      styleOverrides={styleOverrides?.container}
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
              {typeof hint === 'string' ? (
                <Text textStyle='bodyRegular'>{hint}</Text>
              ) : (
                hint
              )}
            </InfoTooltip.Content>
          </InfoTooltip>
        )}
      </Box>
      <Controller
        name={name}
        rules={validationOptions}
        render={({ field: { onChange, value } }) => {
          return (
            <Calendar
              config={getCalendarConfig(value)}
              {...rest}
              dateSelected={(selectedValue) => {
                const newDate = selectedValue?.dateRange?.[0] ?? ''
                const oldDate = value ? new Date(value).toISOString() : ''
                if (
                  !newDate ||
                  oldDate !== new Date(selectedValue.dateRange[0]).toISOString()
                ) {
                  onChange(newDate)
                }
                rest.onChange?.(newDate)
              }}
              target={({ setHidden, isHidden, ref, selectedDate }) => {
                return (
                  <CalendarButton
                    onClick={() => {
                      setHidden(!isHidden)
                    }}
                    ref={ref}
                  >
                    {allowEmptyDate && !selectedDate.prettifiedRange
                      ? description
                      : format(selectedDate.dateRange[0], dateFormat)}
                  </CalendarButton>
                )
              }}
            />
          )
        }}
      />
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

const Title = styled(Text)`
  ${(props) => props.styleOverrides}
`

const ValidatedContainer = styled(Label)`
  display: grid;
  grid-template-rows: 20px 36px ${(props) =>
      props.showErrorMessage ? '20px' : '0'};
  ${(props) => props.styleOverrides}
`
