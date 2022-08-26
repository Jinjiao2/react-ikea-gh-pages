/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import React from 'react'

import theme from '@tidbits/react-tidbits/theme'

import { PageHeader } from './index'

describe('PageHeader component', () => {
  test('renders correctly', async () => {
    const tree = render(
      <ThemeProvider theme={theme}>
        <PageHeader title='My title' data-testid='header' />
      </ThemeProvider>,
    )
    expect(tree).toMatchSnapshot()
  })

  test('should display the title', () => {
    render(
      <ThemeProvider theme={theme}>
        <PageHeader title='My title' data-testid='header' />
      </ThemeProvider>,
    )
    expect(screen.getByText('My title')).toBeInTheDocument()
  })

  test('should include any children nodes', () => {
    render(
      <ThemeProvider theme={theme}>
        <PageHeader title='My title' data-testid='header'>
          <div>children</div>
        </PageHeader>
      </ThemeProvider>,
    )
    expect(screen.getByText('children')).toBeInTheDocument()
  })
})
