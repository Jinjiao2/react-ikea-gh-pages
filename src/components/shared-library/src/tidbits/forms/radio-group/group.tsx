import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

import React, { ReactElement, Children, cloneElement } from 'react'

import { Text, Box, InfoTooltip } from '@tidbits/react-tidbits'
import { Label } from '@tidbits/react-tidbits/Form'

import { SystemBoxProps } from '@acs/shared-library/tidbits/react-tidbits'

import { RadioButtonProps } from './button'

type RadioGroupProps = SystemBoxProps & {
  name: string
  styleOverrides?: Partial<{
    cardWrapper?: FlattenSimpleInterpolation
  }>
  children: ReactElement<RadioButtonProps> | ReactElement<RadioButtonProps>[]
  selectedValue?: string
  layout?: 'horizontal' | 'vertical'
  label?: string
  description?: string
  width?: string
  hint?: string | JSX.Element
  isRequired?: boolean
}

export const RadioGroup = ({
  children,
  name,
  hint,
  layout = 'vertical',
  styleOverrides,
  selectedValue,
  label,
  description,
  width = 'max-content',
  isRequired = false,
  ...labelProps
}: RadioGroupProps): JSX.Element => {
  return (
    <Label
      display='grid'
      layout={layout}
      width={width}
      textStyle='h6Medium'
      my='unset'
      py='spacer15'
      {...labelProps}
    >
      <Box display='flex' gap='4px'>
        <Title
          as='div'
          textStyle='h6Regular'
          my='unset'
          color='label'
          isRequired={isRequired}
        >
          {label}
        </Title>
        {hint && (
          <InfoTooltip>
            <InfoTooltip.Content>
              {typeof hint === 'string' ? (
                <Text textStyle='bodyRegular'>{hint}</Text>
              ) : (
                hint
              )}
            </InfoTooltip.Content>
          </InfoTooltip>
        )}
      </Box>
      <Card as='div' mt='spacer5' styleOverrides={styleOverrides?.cardWrapper}>
        {Children.map(children, (child) => {
          return cloneElement(child, { name, selectedValue })
        })}
      </Card>
      <Text as='span' textStyle='bodySmallRegular' spaceAbove='spacer15'>
        {description}
      </Text>
    </Label>
  )
}

const Card = styled(Box)`
  ${(props) => props.styleOverrides}
`

const MandatorySign = css`
  display: inline-block;
  margin-right: 4px;
  color: ${({ theme: { colors } }) => colors.error};
  content: '*';
`

const Title = styled(Text)`
  &:before {
    ${(props) => (props.isRequired ? MandatorySign : '')}
  }
`
