import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Box, Text, Link, Icons } from '@tidbits/react-tidbits'

import { CopyToClipboard } from '@acs/shared-library/tidbits/copy-to-clipboard'

import { DEFAULT_FALLBACK_TEXT } from '../../helpers'

interface Props {
  label: string
  name: string
  description?: string
  width?: string
  copyable?: boolean
  externalLink?: boolean
  displayName?: string
}
export const ReadOnlyLabel = ({
  copyable,
  label,
  name,
  description,
  width,
  externalLink,
  displayName,
}: Props): JSX.Element => {
  const { getValues } = useFormContext()

  const renderValue = (): JSX.Element => {
    const value = getValues(name)
    const displayText = displayName ? getValues(displayName) : ''

    const ValueElement = externalLink ? (
      <Text textStyle='h6Emph'>
        <Link href={`adir://employees/${value}`}>
          {displayText || value || DEFAULT_FALLBACK_TEXT}
          <Icons.ArrowUpRightIcon name='adir' width='10px' ml='3px' />
        </Link>
      </Text>
    ) : (
      <Text textStyle='h6Emph'>{value ?? DEFAULT_FALLBACK_TEXT}</Text>
    )

    return copyable ? (
      <CopyToClipboard key='readonlyLabel' valueToCopy={value}>
        {ValueElement}
      </CopyToClipboard>
    ) : (
      ValueElement
    )
  }

  return (
    <Box width={width} mb='spacer15'>
      <Text as='div' textStyle='h6Regular' mb='spacer5'>
        {label}
      </Text>
      {renderValue()}
      <Text textStyle='bodySmallRegular'>{description}</Text>
    </Box>
  )
}
