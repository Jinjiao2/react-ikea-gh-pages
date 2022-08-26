import kebabCase from 'lodash/kebabCase'
import styled from 'styled-components'

import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { TabbedHeader } from '@tidbits/react-tidbits'

import { getTabMenuItems, TabMenuType } from './helper'

interface Props {
  projectId?: string
  baseUrl?: string
  pageTabMenuType: TabMenuType
}

export const PageTabMenu = ({
  projectId,
  baseUrl,
  pageTabMenuType,
}: Props): JSX.Element => {
  const path = projectId ? `${baseUrl}/${projectId}` : baseUrl
  const tabMenuItems = getTabMenuItems(pageTabMenuType)
  const { pathname } = useLocation()
  return (
    <PageTabs>
      {tabMenuItems.map((tab, index) => {
        return (
          <NavLink
            data-testid={`${kebabCase(tab.title)}-tab`}
            to={`${path}${tab.rootUrl}`}
            key={`${tab.rootUrl}${index}`}
          >
            <TabbedHeader.Tab
              as='span'
              active={
                tab?.isRootUrlEndsWith
                  ? pathname?.endsWith(tab.rootUrl)
                  : pathname?.includes(tab.rootUrl)
              }
            >
              {tab.title}
            </TabbedHeader.Tab>
          </NavLink>
        )
      })}
    </PageTabs>
  )
}

const PageTabs = styled(TabbedHeader.Tabs)`
  justify-content: flex-end;
  font-size: 14px;
  font-weight: 600;
`
