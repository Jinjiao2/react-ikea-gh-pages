/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import React from 'react'

import { WebNotification } from './index'

describe('WebNotification component', () => {
  test('renders correctly', async () => {
    const tree = render(
      <WebNotification description='test desc' title='Title - test' />,
    )
    expect(tree).toMatchSnapshot()
  })
})
