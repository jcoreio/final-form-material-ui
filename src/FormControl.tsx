import * as React from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import { FieldRenderProps } from 'react-final-form'

interface FormControlWrapperProps extends FieldRenderProps<any, any> {
  label?: string
  FormLabelProps?: any
  FormHelperTextProps?: any
  children?: React.ReactNode
}

export default function FormControlWrapper({
  input,
  meta,
  label,
  FormLabelProps,
  FormHelperTextProps,
  children,
  ...rest
}: FormControlWrapperProps): React.ReactNode {
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched

  return (
    <FormControl {...rest} error={showError}>
      {label && <FormLabel {...FormLabelProps}>{label}</FormLabel>}
      {children}
      {showError && (
        <FormHelperText {...FormHelperTextProps}>
          {meta.error || meta.submitError}
        </FormHelperText>
      )}
    </FormControl>
  )
}
