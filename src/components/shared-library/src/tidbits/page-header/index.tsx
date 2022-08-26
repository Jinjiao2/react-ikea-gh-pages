import styled from 'styled-components'

import React, { Fragment, ReactNode, useMemo } from 'react'

import { Box, SectionHeading, Text } from '@tidbits/react-tidbits'

import { CopyToClipboard } from '@acs/shared-library/tidbits/copy-to-clipboard'

interface Props {
  'data-testid': string
  actionButtons?: ReactNode | ReactNode[]
  subTitle?: ReactNode
  children?: ReactNode
  titleIcon?: ReactNode
  title: string | ReactNode
  copyableText?: string
}

export const PageHeader = ({
  actionButtons,
  children,
  copyableText = '',
  title,
  titleIcon,
  subTitle,
  'data-testid': dataTestId,
}: Props): JSX.Element => {
  const renderActionButtons = () => {
    if (!actionButtons) {
      return null
    }
    if (Array.isArray(actionButtons)) {
      return (
        <Fragment>
          {actionButtons.filter(Boolean).map((button, idx) => (
            <SectionHeading.ToolButton key={idx}>
              {button}
            </SectionHeading.ToolButton>
          ))}
        </Fragment>
      )
    } else {
      return (
        <SectionHeading.ToolButton>{actionButtons}</SectionHeading.ToolButton>
      )
    }
  }

  const renderTitle = useMemo(
    () => (
      <Text as='h3' textStyle='h3Emph' lineHeight='29px'>
        {titleIcon}
        {title}
      </Text>
    ),
    [title],
  )

  return (
    <Box borderColor='keyline' borderBottom='1px solid' mb='spacer20'>
      <SectionHeading
        data-testid={dataTestId}
        titleComponent={
          <Box>
            <Box display='flex' alignItems='baseline'>
              {copyableText ? (
                <CopyToClipboard valueToCopy={copyableText}>
                  {renderTitle}
                </CopyToClipboard>
              ) : (
                renderTitle
              )}
            </Box>
            {subTitle && <Box mt='spacer20'>{subTitle}</Box>}
          </Box>
        }
      >
        <Content>
          {children}
          {renderActionButtons()}
        </Content>
      </SectionHeading>
    </Box>
  )
}

const Content = styled.div`
  display: flex;
  align-items: center;
`
