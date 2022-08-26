import { timeToString } from '@acs/shared-library/tidbits/forms/validated-date-picker/helper'

describe('Helper', () => {
  describe('timeToString', () => {
    test('return formatted time if zero', () => {
      expect(timeToString(0)).toEqual('00')
    })
    test('return formatted time if length is 2', () => {
      expect(timeToString(12)).toEqual('12')
    })
    test('return formatted time if length more than 2', () => {
      expect(timeToString(122)).toEqual('122')
    })
  })
})
