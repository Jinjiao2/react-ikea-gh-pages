/**
 * @jest-environment jsdom
 */
import {
  getQueryParamByKey,
  clearAllTimeouts,
  getAllQueryParams,
  extractRepoNameFromPIEGitURL,
  formatDropdownData,
} from './index'

describe('Shared: Helper', () => {
  describe('getLocationQueryParam', () => {
    test('return value for query param in the url', () => {
      const url = 'https://gameofthrones.com?kingofthenorth=JonSnow'
      expect(getQueryParamByKey(url, 'kingofthenorth')).toEqual('JonSnow')
    })
    test('return only value for requested query param in the url', () => {
      const url =
        'https://gameofthrones.com?kingofthenorth=JonSnow&ironthrone=noone'
      expect(getQueryParamByKey(url, 'kingofthenorth')).toEqual('JonSnow')
    })
    test('return empty when query param not available', () => {
      const url = 'https://gameofthrones.com'
      expect(getQueryParamByKey(url, 'kingofthenorth')).toEqual('')
    })
  })

  describe('clearAllTimeouts', () => {
    test('return undefined', () => {
      expect(clearAllTimeouts()).toEqual(undefined)
    })
  })

  describe('getAllQueryParams', () => {
    test('return url after removal of first char', () => {
      const url = 'https://gameofthrones.com'
      expect(getAllQueryParams(url)).toEqual({
        'ttps://gameofthrones.com': 'ttps://gameofthrones.com',
      })
    })
  })

  describe('extractRepoNameFromPIEGitURL', () => {
    test('return blank string', () => {
      const url = 'https://gameofthrones.com'
      expect(extractRepoNameFromPIEGitURL(url)).toEqual('')
    })
  })

  describe('formatDropdownData', () => {
    test('return array having objects', () => {
      const error = [
        {
          id: '2',
          name: 'test',
          key: 'value',
        },
      ]

      expect(formatDropdownData(error)).toEqual([{ label: 'test', value: '2' }])
    })
  })
})
