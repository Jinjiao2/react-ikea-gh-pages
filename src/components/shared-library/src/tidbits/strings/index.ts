import { capitalize } from 'lodash'

export const STRING = {
  getRequiredString: (name: string): string => {
    return `${capitalize(name)} is required.`
  },

  getUniqueString: (name: string): string => {
    return `${capitalize(name)} should be unique.`
  },

  getDropdownString: (name: string): string => {
    return `Select ${capitalize(name)}...`
  },

  getCharacterLimitString: (name: string): string => {
    return `${capitalize(
      name,
    )} should must start with a letter and contain 2-63 alphanumeric characters.`
  },

  getKernelNameString: (name: string): string => {
    return `${capitalize(
      name,
    )} should must start with a letter and contain 2-63 alphanumeric characters and hypen or dot.`
  },
  getNumberLimitString: (name: string): string => {
    return `${capitalize(name)} should only contain numbers.`
  },

  getNameWithNoSpaceValidationMessage: (name: string): string => {
    return `${capitalize(
      name,
    )} must start with a letter and can contain 2-63 alphanumeric characters and hyphen. No spaces are allowed.`
  },

  getSecretFileValidationString: (): string => {
    return 'Secret key must start with a letter and can contain 2-63 alphanumeric characters and ".", "_", "-". No spaces are allowed.'
  },

  getSecretEnvironmentVariableValidationString: (): string => {
    return "Environment variable's secret name should be one or more of A-Z, a-z, 0-9, underscore. No hyphens are allowed."
  },

  getBucketNameValidationString: (): string => {
    return 'Bucket name should start with a letter and can contain 2-63 alphanumeric characters, underscore and hyphen. No spaces are allowed.'
  },

  getClusterArnString: (name: string): string => {
    return `${capitalize(
      name,
    )} must start with a letter and can contain 2-256 alphanumeric characters and ".", "/", ":", "-", "_". No spaces are allowed.`
  },

  getClusterNameString: (name: string): string => {
    return `${capitalize(
      name,
    )} must start with a letter and can contain 2-256 alphanumeric characters and ".", "-", "_".`
  },

  getClusterUrlString: (name: string): string => {
    return `${capitalize(
      name,
    )} must start with 'https://' and can contain 2-256 alphanumeric characters and "!", "#",
    "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", "_", ".", "/", "@", ":", ";", "<", "=", ">",
    "[", "]", "^", "\`", "{", "|", "}", "~", "?", "\\". No spaces are allowed.`
  },

  getDescriptionValidationString: (): string => {
    return 'Description length should be less or equal to 800 characters.'
  },

  getNamespaceValidationString: (): string => {
    return 'Namespace cannot be named default'
  },

  getMessageCreateSuccess: (title?: string): string => {
    const message = 'Successfully created'
    return title ? `${message} ${title}` : message
  },

  getMessageUpdateSuccess: (title?: string): string => {
    const message = 'Successfully updated'
    return title ? `${message} ${title}` : message
  },

  getMessageDeleteSuccess: (title?: string): string => {
    const message = 'Successfully deleted'
    return title ? `${message} ${title}` : message
  },

  SUCCESS: 'Success',
  FAILED: 'Failed',
}
