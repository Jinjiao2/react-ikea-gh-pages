/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import React from 'react'

import theme from '@tidbits/react-tidbits/theme'

import { NotFoundStatePanel } from './index'

describe('State panel component', () => {
  test('renders correctly', async () => {
    const tree = render(
      <ThemeProvider theme={theme}>
        <NotFoundStatePanel />
      </ThemeProvider>,
    )
    expect(tree).toMatchSnapshot()
  })

  test('should return the element by text', async () => {
    render(
      <ThemeProvider theme={theme}>
        <NotFoundStatePanel />
      </ThemeProvider>,
    )
    expect(
      screen.getByText("Don't panic. Something went wrong."),
    ).toBeInTheDocument()
  })
})
