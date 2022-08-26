/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import React from 'react'

import theme from '@tidbits/react-tidbits/theme'

import { ValueLink } from './value-link'

describe('ValueLink component', () => {
  test('renders correctly', async () => {
    const tree = render(
      <ThemeProvider theme={theme}>
        <ValueLink value='test val' textStyle='h1Regular' url='test.com' />
      </ThemeProvider>,
    )
    expect(tree).toMatchSnapshot()
  })
})
