import styled from 'styled-components'

import React, { FC, useCallback } from 'react'

import { Box, Button } from '@tidbits/react-tidbits'

import { CustomSelectionProps } from '@acs/shared-library/tidbits/forms/validated-date-picker/helper'

import { DaySelection } from '../day-selection'
import { TimeSelection } from '../time-selection'

interface ClearableSelectionProps {
  enableTimePicker: boolean
  allowEmptyDate: boolean
}

export const clearableSelection: (
  props: ClearableSelectionProps,
) => FC<CustomSelectionProps> = ({ enableTimePicker, allowEmptyDate }) => (
  props,
) => {
  const { updateSelectedDate, closeCalendar, range, selectedDateRange } = props
  const onClearDayCallback = useCallback(() => {
    updateSelectedDate(range)
    closeCalendar()
  }, [range, updateSelectedDate, closeCalendar])

  const Component = enableTimePicker ? TimeSelection : DaySelection
  return (
    <React.Fragment>
      <Component {...props} />
      {allowEmptyDate && (
        <Footer>
          <Button
            variant='standard'
            primary
            key='save-button'
            onClick={onClearDayCallback}
            disabled={!selectedDateRange[0]}
            title='Save pipeline'
          >
            Clear
          </Button>
        </Footer>
      )}
    </React.Fragment>
  )
}

const Footer = styled(Box)`
  margin: 10px 30px 0 0;
  button {
    float: right;
  }
`
