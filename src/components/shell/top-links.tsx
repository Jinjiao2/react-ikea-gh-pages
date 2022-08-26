import React from 'react'

import { Box, Input, SearchAltIcon } from '@tidbits/react-tidbits'

export const TopLinks = (): JSX.Element => {
  return (
    <Box>
      <Input.Text
        IconComponent={SearchAltIcon}
        type='text'
        width='1000px'
        variant='disabled'
        placeholder='Search for products and inspiration for a better everyday life at home'
        borderRadius='50em'
        height='50px'
      />
    </Box>
  )
}
