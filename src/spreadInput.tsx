import * as React from 'react'
import { FieldRenderProps } from 'react-final-form'

const spreadInput = (
  Component: React.ComponentType<Partial<FieldRenderProps<any, any>['input']>>
) => ({
  input,
  meta,
  ...rest
}: FieldRenderProps<any, any>): React.ReactNode => (
  <Component {...input} {...rest} />
)

export default spreadInput
