/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import React from 'react'

import theme from '@tidbits/react-tidbits/theme'

import { LabelValue } from './index'

describe('LabelValue component', () => {
  test('should return the element by text', async () => {
    render(
      <ThemeProvider theme={theme}>
        <LabelValue
          label='test label'
          value='test value'
          link='test link'
          subTitleValue={undefined}
        />
      </ThemeProvider>,
    )
    expect(screen.getByText('test label')).toBeInTheDocument()
    expect(screen.getByText('test value')).toBeInTheDocument()
  })
})
