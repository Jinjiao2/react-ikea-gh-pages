import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Text } from '@tidbits/react-tidbits'

interface RadioGroupProps {
  name: string
  defaultValue: string
}
export const BooleanRadioGroup = ({
  name,
  defaultValue,
}: RadioGroupProps): JSX.Element => {
  const { register } = useFormContext()
  return (
    <div>
      <input
        type='radio'
        id='radio-true'
        value='true'
        defaultChecked={defaultValue === 'true'}
        {...register(name, { required: true })}
      />
      <Text ml='spacer20' mr='spacer5' weight='medium'>
        True
      </Text>
      <input
        type='radio'
        id='radio-true'
        value='false'
        defaultChecked={defaultValue === 'false'}
        {...register(name, { required: true })}
      />
      <Text ml='spacer20' mr='spacer5' weight='medium'>
        False
      </Text>
    </div>
  )
}
