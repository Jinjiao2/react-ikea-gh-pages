/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import React from 'react'

import theme from '@tidbits/react-tidbits/theme'

import { ValidationError } from './index'

describe('ValidationError component', () => {
  test('renders correctly', async () => {
    const tree = render(
      <ThemeProvider theme={theme}>
        <ValidationError children='test' />
      </ThemeProvider>,
    )
    expect(tree).toMatchSnapshot()
  })
})
