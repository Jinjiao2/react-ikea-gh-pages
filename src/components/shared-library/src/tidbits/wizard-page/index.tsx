// TODO: Enable this for developement but hide it from UI tests
// import { DevTool } from '@hookform/devtools'
import React, { ReactNode } from 'react'
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form'

import { Button, Box, Text, InlineSpinner } from '@tidbits/react-tidbits'

import { FormatProperty } from '@local-types/notebook'

export interface WizardPageProps<T> {
  children?: ReactNode
  title: string
  description?: string
  type?: 'inline' | 'standalone'
  action: string
  contextValues: UseFormReturn<T>
  isLoading?: boolean
  onSubmit?: SubmitHandler<T>
  onCancel?: () => void
  onDelete?: () => void
  areDynamicFieldsEmpty?: boolean
  dataTestId?: string
  defaultFormatProperty?: FormatProperty[]
  dataFetchingError?: boolean
  enableSaveForPureValues?: boolean
  isActionButtonDisabled?: boolean
  canDelete?: boolean
  secondaryAction?: string
}

export const WizardPage = <T extends FieldValues>({
  children,
  title,
  description,
  action,
  contextValues,
  isLoading,
  onSubmit,
  onCancel,
  onDelete,
  areDynamicFieldsEmpty = false,
  dataTestId,
  dataFetchingError,
  enableSaveForPureValues,
  isActionButtonDisabled,
  canDelete = true,
  secondaryAction,
}: WizardPageProps<T>): JSX.Element => {
  const {
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = contextValues

  return (
    <FormProvider {...contextValues}>
      <form
        onSubmit={handleSubmit(onSubmit as SubmitHandler<T>)}
        name={dataTestId}
        data-testid={dataTestId}
      >
        <Box m='0px'>
          <Box>
            {title && (
              <Text as='div' textStyle='h3Emph'>
                {title}
              </Text>
            )}
            {description && (
              <Text as='div' py='spacer5' textStyle='bodyRegular'>
                {description}
              </Text>
            )}
          </Box>
          <Box my='spacer20'>{children}</Box>
          <Box display='flex' justifyContent='flex-end'>
            {onDelete && (
              <Box marginRight='auto'>
                <Button
                  type='button'
                  variant='destructive'
                  onClick={onDelete}
                  data-testid='delete'
                  disabled={!canDelete}
                >
                  {secondaryAction || 'Delete'}
                </Button>
              </Box>
            )}
            {onCancel && (
              <Button
                variant='standard'
                onClick={onCancel}
                type='button'
                data-testid='cancel'
              >
                Cancel
              </Button>
            )}
            {onSubmit && (
              <Button
                ml='spacer10'
                type='submit'
                primary
                data-testid={`submit-${action
                  .toLowerCase()
                  .split(' ')
                  .join('-')}`}
                variant='standard'
                disabled={
                  (!isDirty && !enableSaveForPureValues) ||
                  !isValid ||
                  isSubmitting ||
                  isLoading ||
                  areDynamicFieldsEmpty ||
                  dataFetchingError ||
                  isActionButtonDisabled
                }
              >
                {action}
                <InlineSpinner
                  bg='ctrlDisabled'
                  ml='spacer10'
                  visible={isLoading}
                />
              </Button>
            )}
          </Box>
        </Box>
      </form>

      {/* {__DEV__ && <DevTool control={contextValues.control} />} */}
    </FormProvider>
  )
}
