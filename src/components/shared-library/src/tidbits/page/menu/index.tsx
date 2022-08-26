import isEqual from 'lodash/isEqual'
import styled from 'styled-components'

import React, { Fragment } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { NavMenu, Icons } from '@tidbits/react-tidbits'

import {
  getSectionMenuItems,
  IItem,
  IMenuItem,
  SectionMenuType,
} from './helper'

interface Props {
  'data-testid'?: string
  baseUrl: string
  projectId?: string
  jobId?: string
  sectionMenuType: SectionMenuType
}

export const PageMenu = ({
  'data-testid': dataTestId = 'project-menu',
  baseUrl,
  sectionMenuType,
  projectId,
  jobId,
}: Props): JSX.Element => {
  const path = projectId ? `${baseUrl}/${projectId}` : baseUrl
  const menuItems = getSectionMenuItems(sectionMenuType)
  const { pathname } = useLocation()
  return menuItems?.length ? (
    <NavMenu variant='side' data-testid={dataTestId}>
      {menuItems?.map((menuItem: IMenuItem, index) => {
        return (
          <Fragment key={`${menuItem?.rootUrl}${index}`}>
            <NavMenu.Title>{menuItem?.title}</NavMenu.Title>
            <NavMenu.Links>
              {menuItem?.items?.map((item: IItem) => {
                const menuPath = jobId
                  ? `${path}${menuItem?.rootUrl}/${jobId}${item?.url}`
                  : `${path}${menuItem?.rootUrl}${item?.url}`

                const isActive = item?.isExactPath
                  ? isEqual(pathname, menuPath)
                  : pathname.includes(menuPath)

                return !item?.externalUrl ? (
                  <NavMenu.Link
                    as='div'
                    key={menuPath}
                    active={isActive}
                    py='4px'
                    px='4px'
                  >
                    <NavItem to={menuPath}>{item?.title}</NavItem>
                  </NavMenu.Link>
                ) : (
                  <NavMenu.Link
                    as='a'
                    href={`${item?.externalUrl}?project_id=${projectId}`}
                    target='_blank'
                    key={item?.externalUrl}
                    active={isActive}
                    py='4px'
                    px='4px'
                  >
                    {item?.title}
                    <Icons.ArrowUpRightThinIcon width='9px' ml='spacer5' />
                  </NavMenu.Link>
                )
              })}
            </NavMenu.Links>
          </Fragment>
        )
      })}
    </NavMenu>
  ) : (
    <Fragment />
  )
}

const NavItem = styled(NavLink)`
  display: block;
`
