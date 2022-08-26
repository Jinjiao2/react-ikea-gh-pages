import styled from 'styled-components'

import React, { FC } from 'react'
import { ChangeEvent } from 'react'

import { MenuList } from '@tidbits/react-tidbits'
import { Box } from '@tidbits/react-tidbits'
import { Text as TextInput } from '@tidbits/react-tidbits/Input'

import { ValidationError } from '../../validation-error'

type FreeTextOptionProps = {
  value: string | null
  freeTextPlaceholder?: string
  onChange: (value: string) => void
  onKeyDown: (e: KeyboardEvent) => void
  errorText: string
}

export const FreeTextOption: FC<FreeTextOptionProps> = ({
  value,
  freeTextPlaceholder,
  onChange,
  onKeyDown,
  errorText,
}) => {
  return (
    <React.Fragment>
      <MenuList.Item
        key={'free-text'}
        onClick={(e: Event) => e.stopPropagation()}
      >
        <TextInput
          autoCorrect='off'
          autoFocus={true}
          value={value}
          placeholder={freeTextPlaceholder}
          spellCheck='false'
          variant={errorText ? 'error' : ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          onKeyDown={onKeyDown}
        />
        <ErrorContainer>
          {errorText && <ValidationError>{errorText}</ValidationError>}
        </ErrorContainer>
      </MenuList.Item>
      <MenuList.HR key={'free-text-delimiter'}></MenuList.HR>
    </React.Fragment>
  )
}

const ErrorContainer = styled(Box)`
  margin-top: 4px;
  height: 16px;
`
