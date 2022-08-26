import { isAppleGroupName } from './helper'

describe('Apple Group Input: Helper', () => {
  describe('isAppleGroupName', () => {
    test('return true for valid group', () => {
      const group = 'aci-datastudio-support@group.apple.com'
      expect(isAppleGroupName(group)).toEqual(true)
    })

    test('return false for invalid group', () => {
      const group = 'aci-datastudio-support@apple.com'
      expect(isAppleGroupName(group)).toEqual(false)
    })

    test('return false for valid group', () => {
      const group = 'aci-datastudio-support@group.apple.com.hacker.com'
      expect(isAppleGroupName(group)).toEqual(false)
    })
  })
})
