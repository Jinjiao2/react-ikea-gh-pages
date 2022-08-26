import React from 'react'

import { Box, Panel, Text } from '@tidbits/react-tidbits'

export const NotFoundStatePanel = (): JSX.Element => {
  return (
    <Panel display='flex' justifyContent='center' mt='spacer20'>
      <Box textAlign='center'>
        <Text as='h3' textStyle='h3Emph' sb='spacer15'>
          Don&apos;t panic. Something went wrong.
        </Text>
        <Text as='h5' textStyle='h5Emph' sb='spacer15'>
          Browser doesn&apos;t like the page you were trying to load.
        </Text>
        <Text textStyle='bodyRegular' color='label' pt='spacer10'>
          Please check the url and try again.
        </Text>
      </Box>
    </Panel>
  )
}
