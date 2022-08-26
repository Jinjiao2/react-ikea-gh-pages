import { format, setHours, setMinutes, setSeconds, addHours } from 'date-fns'
import styled from 'styled-components'

import React, { useCallback, useState, RefCallback, useMemo } from 'react'

import { Input, Box } from '@tidbits/react-tidbits'
import { Header, Month } from '@tidbits/react-tidbits-calendar'
import { Label } from '@tidbits/react-tidbits/Form'

import { CustomSelectionProps } from '@acs/shared-library/tidbits/forms/validated-date-picker/helper'
import {
  TIME_PICKER_TYPE,
  TimePicker,
} from '@acs/shared-library/tidbits/forms/validated-date-picker/time-selection/time-picker'

enum TIME_PERIOD {
  AM = 'AM',
  PM = 'PM',
}

export const TimeSelection = React.memo<CustomSelectionProps>(
  ({
    dateView,
    updateSelectedDate,
    range,
    isDisabledDate,
    selectedDateRange,
    hoveredDateRange,
    closeCalendar,
    setHoveredDateRange,
  }) => {
    const [portalContainer, setPortalContainer] = useState<HTMLDivElement>()
    const measuredRef: RefCallback<HTMLDivElement> = useCallback((node) => {
      if (node !== null) {
        setPortalContainer(node)
      }
    }, [])

    const onSelectDayCallback = useCallback(
      (date) => {
        const newDate = setHours(date, 0)
        updateSelectedDate(range, newDate)
        closeCalendar()
      },
      [range, updateSelectedDate, closeCalendar],
    )

    const onSelectTimeCallback = (type: TIME_PICKER_TYPE, time: number) => {
      if (!selectedDateRange[0]) {
        return
      }
      let date = selectedDateRange[0]
      switch (type) {
        case TIME_PICKER_TYPE.HOURS:
          date = setHours(date, time)
          break
        case TIME_PICKER_TYPE.MINUTES:
          date = setMinutes(date, time)
          break
        case TIME_PICKER_TYPE.SECONDS:
          date = setSeconds(date, time)
          break
      }
      updateSelectedDate(range, date)
    }

    const onSelectHoursCallback = useCallback(
      (time: number) => onSelectTimeCallback(TIME_PICKER_TYPE.HOURS, time),
      [selectedDateRange, updateSelectedDate],
    )
    const onSelectMinutesCallback = useCallback(
      (time: number) => onSelectTimeCallback(TIME_PICKER_TYPE.MINUTES, time),
      [selectedDateRange, updateSelectedDate],
    )
    const onSelectSecondsCallback = useCallback(
      (time: number) => onSelectTimeCallback(TIME_PICKER_TYPE.SECONDS, time),
      [selectedDateRange, updateSelectedDate],
    )
    const onSelectPeriodCallback = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const period = e.target.value as TIME_PERIOD
        if (!selectedDateRange[0]) {
          return
        }
        const date = addHours(
          selectedDateRange[0],
          period === TIME_PERIOD.AM ? -12 : 12,
        )
        updateSelectedDate(range, date)
      },
      [selectedDateRange, updateSelectedDate],
    )

    const hoursValue = useMemo(() => {
      return selectedDateRange[0] ? format(selectedDateRange[0], 'hh') : ''
    }, [selectedDateRange])

    const minutesValue = useMemo(() => {
      return selectedDateRange[0] ? format(selectedDateRange[0], 'mm') : ''
    }, [selectedDateRange])

    const secondsValue = useMemo(() => {
      return selectedDateRange[0] ? format(selectedDateRange[0], 'ss') : ''
    }, [selectedDateRange])

    const periodValue = useMemo(() => {
      return selectedDateRange[0] ? format(selectedDateRange[0], 'a') : ''
    }, [selectedDateRange])
    return (
      <React.Fragment>
        <TimeContainer ref={measuredRef}>
          <TimePicker
            portalContainer={portalContainer}
            type={TIME_PICKER_TYPE.HOURS}
            onSelect={onSelectHoursCallback}
            value={hoursValue}
          />
          <TimePicker
            portalContainer={portalContainer}
            type={TIME_PICKER_TYPE.MINUTES}
            onSelect={onSelectMinutesCallback}
            value={minutesValue}
          />
          <TimePicker
            portalContainer={portalContainer}
            type={TIME_PICKER_TYPE.SECONDS}
            onSelect={onSelectSecondsCallback}
            value={secondsValue}
          />
          <Label pb='spacer10'>
            Period
            <Input.Select onChange={onSelectPeriodCallback} value={periodValue}>
              {Object.keys(TIME_PERIOD).map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </Input.Select>
          </Label>
        </TimeContainer>
        <Header
          monthSelection={true}
          yearSelection={true}
          isDisabledDate={isDisabledDate}
        />
        <Month
          rangeType={range}
          disableHoveringOverSelection={true}
          monthDate={dateView}
          onDayHover={setHoveredDateRange}
          onDaySelect={onSelectDayCallback}
          hoveredDateRange={hoveredDateRange}
          selectedDateRange={selectedDateRange}
          isDisabledDate={isDisabledDate}
        />
      </React.Fragment>
    )
  },
)

const TimeContainer = styled(Box)`
  display: flex;
  margin: 0 30px 20px 30px;
  justify-content: space-between;
  gap: 20px;

  select {
    width: 70px;
  }
`
