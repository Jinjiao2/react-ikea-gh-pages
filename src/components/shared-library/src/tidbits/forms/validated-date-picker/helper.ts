import { ranges } from '@tidbits/react-tidbits-calendar'

export const timeToString = (time: number) => {
  return `0${time}`.slice(-2)
}

export interface CustomSelectionProps {
  dateView: Date
  updateSelectedDate: (range: string, date?: Date) => void
  range: string
  isDisabledDate: (date: Date, accuracy: string) => void
  selectedDateRange: Date[]
  hoveredDateRange: Date[]
  closeCalendar: () => void
  setHoveredDateRange: (dates: Date[]) => void
}

export const extendedRanges = {
  ...ranges,
  timePicker: {
    rangeValue: ({ startDate }: { startDate: Date }) => {
      return [startDate, startDate]
    },
    formatter: ({ startDate }: { startDate: Date }) => startDate,
  },
  dayPicker: {
    rangeValue: ({ startDate }: { startDate: Date }) => {
      return [startDate, startDate]
    },
    formatter: ({ startDate }: { startDate: Date }) => startDate,
  },
}
