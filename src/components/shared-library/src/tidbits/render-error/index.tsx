import { ApolloError } from '@apollo/client'

import React from 'react'

import { Box, Text } from '@tidbits/react-tidbits'

import { IdentifierAndName } from '@local-types/common'

import { DEFAULT_UNKNOWN_ERROR_TEXT, getErrorMessage } from '../helpers'
import { NotFoundStatePanel } from '../not-found-state-panel'

type ProjectLiteData = {
  projects: IdentifierAndName[]
}

interface RenderErrorProps {
  projectData?: ProjectLiteData
  errors: (ApolloError | undefined)[]
}

export const RenderError = ({
  projectData,
  errors,
}: RenderErrorProps): JSX.Element | null => {
  if (errors.some((error) => !!error)) {
    const error = errors.find((error) => {
      return error?.message
    })

    return (
      <Box
        p='10px'
        borderRadius='4px'
        borderColor='error'
        border='1px solid'
        bg='bg'
        my='spacer10'
      >
        <Text color='error'>
          {getErrorMessage(error) || DEFAULT_UNKNOWN_ERROR_TEXT}
        </Text>
      </Box>
    )
  } else if (projectData?.projects?.length === 0) {
    return <NotFoundStatePanel />
  } else {
    return null
  }
}
