import React, { ReactNode } from 'react'

import { Text, Link } from '@tidbits/react-tidbits'

import { DEFAULT_FALLBACK_TEXT } from '../helpers'
import { TextStyle } from '../react-tidbits'

type LinkProps = {
  value: ReactNode
  textStyle: TextStyle
  url?: string | { pathname: string; query: Record<string, string> }
}

export const ValueLink = ({
  value,
  textStyle,
  url,
}: LinkProps): JSX.Element => {
  return url ? (
    <Link href={url} textStyle={textStyle}>
      {value}
    </Link>
  ) : (
    <Text component='div' textStyle={textStyle}>
      {DEFAULT_FALLBACK_TEXT}
    </Text>
  )
}
