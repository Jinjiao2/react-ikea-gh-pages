import { format } from 'date-fns'

import React, { FunctionComponent, useCallback } from 'react'

import { Box, Text } from '@tidbits/react-tidbits'
import { Calendar, CalendarButton } from '@tidbits/react-tidbits-calendar'

import { clearableSelection } from '@acs/shared-library/tidbits/forms/validated-date-picker/clearable-selection'
import { extendedRanges } from '@acs/shared-library/tidbits/forms/validated-date-picker/helper'

export type DateRangeValue = {
  start: string
  end: string
}

export type Description = {
  start?: string
  end?: string
}

export interface DateRangePickerProps {
  value: DateRangeValue
  description?: Description
  onChange: (value: DateRangeValue) => void
  dateFormat: string
  allowEmptyDate?: boolean
  enableTimePicker?: boolean
}

const DateRangePicker: FunctionComponent<DateRangePickerProps> = ({
  value,
  onChange,
  dateFormat,
  allowEmptyDate = false,
  enableTimePicker = false,
  description = { start: 'Select Date', end: 'Select Date' },
}) => {
  const getCalendarConfig = useCallback(
    (value: DateRangeValue, rangeKey: keyof DateRangeValue) => {
      const val = value?.[rangeKey] ? new Date(value[rangeKey]) : new Date()
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
        date: allowEmptyDate && !value?.[rangeKey] ? '' : val,
        navItems,
        ranges: extendedRanges,
        range: enableTimePicker ? 'timePicker' : 'dayPicker',
      }
    },
    [allowEmptyDate, enableTimePicker],
  )

  return (
    <Box display={'flex'} gap={10}>
      <Box>
        <Text as='div' textStyle='h6Regular' my='unset' color='label'>
          Start Date and Time
        </Text>
        <Calendar
          config={getCalendarConfig(value, 'start')}
          dateSelected={(selectedValue) => {
            if (!allowEmptyDate && !selectedValue.isoRange) {
              return
            }
            const newDate = selectedValue?.isoRange?.[0] ?? ''
            onChange({
              ...value,
              start: newDate
                ? new Date(selectedValue.isoRange[0]).toISOString()
                : newDate,
            })
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
      </Box>
      <Box>
        <Text as='div' textStyle='h6Regular' my='unset' color='label'>
          End Date and Time
        </Text>
        <Calendar
          config={getCalendarConfig(value, 'end')}
          dateSelected={(selectedValue) => {
            if (!allowEmptyDate && !selectedValue.isoRange) {
              return
            }
            const newDate = selectedValue?.isoRange?.[1] ?? ''
            onChange({
              ...value,
              end: newDate
                ? new Date(selectedValue.isoRange[1]).toISOString()
                : newDate,
            })
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
                  ? description?.end
                  : format(selectedDate.dateRange[0], dateFormat)}
              </CalendarButton>
            )
          }}
        />
      </Box>
    </Box>
  )
}

export default DateRangePicker
