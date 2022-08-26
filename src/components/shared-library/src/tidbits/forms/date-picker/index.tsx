import { format } from 'date-fns'
import styled from 'styled-components'

import React, { FunctionComponent, useCallback } from 'react'

import { Box, Text } from '@tidbits/react-tidbits'
import { Calendar, CalendarButton } from '@tidbits/react-tidbits-calendar'

import { clearableSelection } from '@acs/shared-library/tidbits/forms/validated-date-picker/clearable-selection'
import { extendedRanges } from '@acs/shared-library/tidbits/forms/validated-date-picker/helper'

export type Description = {
  start?: string
}

export interface DateRangePickerProps {
  value: string
  description?: Description
  onChange: (value: string) => void
  dateFormat: string
  allowEmptyDate?: boolean
  enableTimePicker?: boolean
  title?: string
}

const DatePicker: FunctionComponent<DateRangePickerProps> = ({
  value,
  onChange,
  dateFormat,
  allowEmptyDate = false,
  enableTimePicker = false,
  description = { start: 'Select Date' },
  title,
}) => {
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
    <CalendarContainer>
      <Text as='div' textStyle='h6Regular' my='unset' color='label' width='15%'>
        {title || 'Start Date and Time'}
      </Text>
      <Calendar
        config={getCalendarConfig(value)}
        dateSelected={(selectedValue) => {
          if (!allowEmptyDate && !selectedValue.isoRange) {
            return
          }
          const newDate = selectedValue?.isoRange?.[0] ?? ''
          onChange(
            newDate
              ? new Date(selectedValue.isoRange[0]).toISOString()
              : newDate,
          )
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
                ? description?.start
                : format(selectedDate.dateRange[0], dateFormat)}
            </CalendarButton>
          )
        }}
      />
    </CalendarContainer>
  )
}

const CalendarContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: baseline;
`

export default DatePicker
