import { setHours } from 'date-fns'

import React, { useCallback } from 'react'

import { Header, Month } from '@tidbits/react-tidbits-calendar'

import { CustomSelectionProps } from '@acs/shared-library/tidbits/forms/validated-date-picker/helper'

export const DaySelection = React.memo<CustomSelectionProps>(
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
    const onSelectDayCallback = useCallback(
      (date) => {
        const newDate = setHours(date, 0)
        updateSelectedDate(range, newDate)
        closeCalendar()
      },
      [range, updateSelectedDate, closeCalendar],
    )
    return (
      <React.Fragment>
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
