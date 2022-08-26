import { debounce } from 'lodash'

import React, { FC, useCallback, useState, useEffect } from 'react'

import { Popover, MenuList, Input } from '@tidbits/react-tidbits'
import { Label } from '@tidbits/react-tidbits/Form'

import { timeToString } from '@acs/shared-library/tidbits/forms/validated-date-picker/helper'
import { INTERVAL_1_SECOND, REGEX } from '@acs/shared-library/tidbits/helpers'
import {
  DropdownMenuChildrenProps,
  DropdownMenuTargetProps,
} from '@acs/shared-library/tidbits/react-tidbits'

export enum TIME_PICKER_TYPE {
  HOURS = 'HH',
  MINUTES = 'MM',
  SECONDS = 'SS',
}

interface TimePickerProps {
  type: TIME_PICKER_TYPE
  onSelect: (time: number) => void
  value: string
  portalContainer?: HTMLDivElement
}

const TIME_LIMITS = {
  [TIME_PICKER_TYPE.HOURS]: { min: 1, max: 12 },
  [TIME_PICKER_TYPE.MINUTES]: { min: 0, max: 59 },
  [TIME_PICKER_TYPE.SECONDS]: { min: 0, max: 59 },
}

const TIME_LABELS = {
  [TIME_PICKER_TYPE.HOURS]: 'Hours',
  [TIME_PICKER_TYPE.MINUTES]: 'Minutes',
  [TIME_PICKER_TYPE.SECONDS]: 'Seconds',
}

const defaultTime = '00'

export const TimePicker: FC<TimePickerProps> = ({
  type,
  onSelect,
  value,
  portalContainer,
}) => {
  const [time, setTime] = useState(value || defaultTime)
  const debouncedOnSelect = useCallback(
    debounce(onSelect, INTERVAL_1_SECOND),
    [],
  )

  useEffect(() => {
    if (value) {
      setTime(value)
    }
  }, [value])

  const getOptions = useCallback(
    ({ hide }: DropdownMenuChildrenProps) => {
      let range: number[]

      switch (type) {
        case TIME_PICKER_TYPE.HOURS:
          range = [...Array(13).keys()].slice(1)
          break
        case TIME_PICKER_TYPE.MINUTES:
        case TIME_PICKER_TYPE.SECONDS:
          range = [...Array(60).keys()].filter((time) => time % 5 === 0)
          break
      }
      return range.map((time) => {
        return (
          <MenuList.Item
            key={`${type}-${time}`}
            onClick={() => {
              hide()
              setTime(timeToString(time))
              onSelect(+time)
            }}
          >
            {time}
          </MenuList.Item>
        )
      })
    },
    [type],
  )

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      const inputValue = e.target.value
      if (inputValue == '') {
        setTime(defaultTime)
        debouncedOnSelect(0)
        return
      }
      if (
        !REGEX.NUMBER.exec(inputValue) ||
        +inputValue < TIME_LIMITS[type].min ||
        +inputValue > +TIME_LIMITS[type].max
      ) {
        return
      }
      setTime(timeToString(+inputValue))
      debouncedOnSelect(+inputValue)
    },
    [time],
  )

  const handleInputClick = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.select()
      // workaround for input focus because DropdownMenu uses setTimeout to focus menu list
      setTimeout(() => {
        e.target.focus()
      }, 0)
    },
    [time],
  )

  return (
    <Popover.DropdownMenu
      portalContainer={portalContainer}
      containerProps={{ textStyle: 'bodyRegular' }}
      target={({ targetProps }: DropdownMenuTargetProps) => (
        <Label pb='spacer10'>
          {TIME_LABELS[type]}
          <Input.Text
            type='text'
            value={time}
            placeholder={type}
            {...targetProps}
            onChange={onInputChange}
            onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
              targetProps.onClick()
              handleInputClick(e)
            }}
          />
        </Label>
      )}
    >
      {(props: DropdownMenuChildrenProps) => {
        return <MenuList>{getOptions(props)}</MenuList>
      }}
    </Popover.DropdownMenu>
  )
}
