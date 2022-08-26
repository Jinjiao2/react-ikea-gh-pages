import { useGetGroupInfoByEmailLazyQuery } from '@gql-types/hooks'
import { GetGroupInfoByEmailQuery, GroupInfo } from '@gql-types/types'
import head from 'lodash/head'
import styled from 'styled-components'

import React, { ReactElement, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDebounce } from 'react-use'

import { InlineSpinner, Text } from '@tidbits/react-tidbits'
import {
  CloseFilledIcon,
  CheckmarkFilledIcon,
} from '@tidbits/react-tidbits/Icons'

import { ValidatedInput } from '@acs/shared-library/tidbits/forms/validated-input'
import { REGEX } from '@acs/shared-library/tidbits/helpers'

import { isAppleGroupName } from './helper'

interface Props {
  label: string
  name: string
  description?: string
  onChange?: (groupInfo: GroupInfo | undefined) => void
}

const ERROR_MESSAGE = 'Group is required and must end with "@group.apple.com"'

export const AppleGroupInput = ({
  label,
  name,
  description,
  onChange,
}: Props): JSX.Element => {
  const { formState, trigger, getValues } = useFormContext()
  const [emergencyGroup, setEmergencyGroup] = useState(getValues()[name])

  const [
    getGroupInfo,
    { loading: loadingGroupInfo, data: dataGroupInfo, error: errorGroupInfo },
  ] = useGetGroupInfoByEmailLazyQuery({
    onCompleted: (data: GetGroupInfoByEmailQuery) => {
      onChange && onChange(head(data?.groups))
      trigger(name)
    },
    onError: () => {
      trigger(name)
    },
  })

  const groupInfo = useMemo(() => head(dataGroupInfo?.groups), [dataGroupInfo])

  useDebounce(
    () => {
      if (emergencyGroup && isAppleGroupName(emergencyGroup)) {
        getGroupInfo({ variables: { email: emergencyGroup } })
      } else {
        trigger(name)
      }
    },
    600,
    [emergencyGroup],
  )

  const renderRightIcon = (): ReactElement | null => {
    if (loadingGroupInfo) {
      return <InlineSpinner visible mr='10px' />
    }

    if (
      (emergencyGroup && !isAppleGroupName(emergencyGroup)) ||
      errorGroupInfo
    ) {
      return (
        <CloseFilledIcon height='16px' width='16px' mr='10px' color='red' />
      )
    }

    if (emergencyGroup && isAppleGroupName(emergencyGroup) && groupInfo) {
      return (
        <CheckmarkFilledIcon
          height='16px'
          width='16px'
          mr='10px'
          color='limegreen'
        />
      )
    }

    return null
  }

  return (
    <ValidatedInputWithRightIcon
      label={label}
      name={name}
      autoComplete='off'
      placeholder='example@group.apple.com'
      description={
        <Text textSize='bodySmallRegular' mt='spacer5'>
          {description}
        </Text>
      }
      IconComponent={() => <IconWrapper>{renderRightIcon()}</IconWrapper>}
      onInput={(event) => {
        setEmergencyGroup(event.target.value)
      }}
      validationOptions={{
        required: {
          message: ERROR_MESSAGE,
          value: true,
        },
        validate: () => {
          if (!loadingGroupInfo) {
            return formState.dirtyFields[name] && emergencyGroup
              ? !!groupInfo || 'Apple Directory group is not valid'
              : true
          }
          return true
        },
        pattern: {
          value: REGEX.APPLE_GROUP,
          message: ERROR_MESSAGE,
        },
      }}
    />
  )
}

// Workaround to set icon on right side
const ValidatedInputWithRightIcon = styled(ValidatedInput)`
  padding-left: 8px;

  & input[name='emergencyGroup'] {
    padding-left: 8px;
    padding-right: 28px;
  }
`

const IconWrapper = styled.i`
  display: flex;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
`
