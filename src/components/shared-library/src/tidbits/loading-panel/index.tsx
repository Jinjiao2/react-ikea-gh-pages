import React from 'react'

import { Box, InlineSpinner, Text } from '@tidbits/react-tidbits'

interface LoadingProp {
  isLoading: boolean
  label?: string
  inline?: boolean
}

export const LoadingPanel = ({ label, isLoading, inline }: LoadingProp) => {
  const footerHeight = '65px'
  const height = inline ? 'auto' : `calc(50vh - ${footerHeight})`
  return isLoading ? (
    <Box
      alignItems='center'
      bg='bg'
      borderRadius='4px'
      color='label'
      display='flex'
      height={height}
      justifyContent='center'
      padding='20px'
      textStyle='bodyRegular'
      width='100%'
    >
      <Text as='div' textStyle='h5Emph'>
        <InlineSpinner visible={isLoading} mx='4px' />{' '}
        {label ? `Loading ${label}...` : 'Loading...'}
      </Text>
    </Box>
  ) : null
}
