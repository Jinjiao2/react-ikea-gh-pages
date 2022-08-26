import styled, { FlattenSimpleInterpolation } from 'styled-components'

import React, { FC } from 'react'

import { Text, Icons } from '@tidbits/react-tidbits'

interface Props {
  styleOverrides?: FlattenSimpleInterpolation
}

export const ValidationError: FC<Props> = ({
  styleOverrides,
  children,
}): JSX.Element => {
  return (
    <WrapperText
      textStyle='bodySmallRegular'
      color='error'
      marginBottom='unset'
      styleOverrides={styleOverrides}
    >
      <CloseFilledIcon height='16px' />
      {children}
    </WrapperText>
  )
}

const WrapperText = styled(Text)`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin-top: 4px;
  ${(props) => props.styleOverrides}
`

const CloseFilledIcon = styled(Icons.CloseFilledIcon)`
  margin-right: 6px;
`
