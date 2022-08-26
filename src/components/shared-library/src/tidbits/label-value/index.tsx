import { isEmpty } from 'lodash'
import styled, { FlattenSimpleInterpolation } from 'styled-components'

import React, { ReactNode } from 'react'

import { Text, Box, Icons } from '@tidbits/react-tidbits'

import { DEFAULT_FALLBACK_TEXT } from '../helpers'
import { ValueLink } from './value-link'

type Props = {
  dataTestId?: string
  label: string
  value: ReactNode
  link?: string | { pathname: string; query: Record<string, string> }
  subTitleValue?: Node
  iconName?: string
  id?: string
  styleOverrides?: {
    textWrapper?: FlattenSimpleInterpolation
  }
}

export const LabelValue = ({
  dataTestId,
  label,
  value,
  link,
  subTitleValue,
  iconName,
  styleOverrides,
  ...props
}: Props): JSX.Element => {
  const renderValue = (): JSX.Element => {
    const hasValue = !isEmpty(value)
    if (hasValue && !isEmpty(link)) {
      return (
        <ValueLink
          data-testid={dataTestId}
          textStyle={'h5Medium'}
          url={link}
          value={value}
        />
      )
    }
    return (
      <TextValue
        textStyle='bodyEmph'
        color='label'
        data-testid={dataTestId}
        styleOverrides={styleOverrides?.textWrapper}
      >
        {iconName && (
          <InfoIcon name={iconName} width='13px' height='13px' color='title' />
        )}{' '}
        {value || DEFAULT_FALLBACK_TEXT}
      </TextValue>
    )
  }

  const renderSubTitleValue = (): JSX.Element | null => {
    return subTitleValue ? (
      <Text textStyle='bodySmallRegular'>{subTitleValue}</Text>
    ) : null
  }

  const renderTitle = (): JSX.Element | null => {
    return label ? (
      <TextLabel textStyle='bodySmallRegular' color='label'>
        {label}
      </TextLabel>
    ) : null
  }

  return (
    <Box {...props}>
      {renderTitle()}
      {renderValue()}
      {renderSubTitleValue()}
    </Box>
  )
}

const TextLabel = styled(Text)`
  padding-bottom: 4px;
  white-space: nowrap;
`

const TextValue = styled(Text)`
  white-space: normal;
  padding-bottom: 4px;
  ${(props) => props.styleOverrides}
`
const InfoIcon = styled(Icons.AlertIcon)`
  vertical-align: middle;
`
