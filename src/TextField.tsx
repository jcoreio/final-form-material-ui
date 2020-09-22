import * as React from 'react'
import { FieldRenderProps } from 'react-final-form'
import TextField from '@material-ui/core/TextField'

export default function TextFieldWrapper({
  input,
  meta,
  ...rest
}: FieldRenderProps<any, any> &
  React.ComponentProps<typeof TextField>): JSX.Element {
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched

  return (
    <TextField
      {...rest}
      {...input}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
    />
  )
}
