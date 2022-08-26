import { REGEX } from '@acs/shared-library/tidbits/helpers'

export function isAppleGroupName(group: string): boolean {
  return REGEX.APPLE_GROUP.test(group)
}
