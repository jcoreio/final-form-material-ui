import * as React from 'react'
import { FieldRenderProps } from 'react-final-form'
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete'

export default function AutocompleteWrapper({
  input: { value, onChange, ...input },
  meta,
  renderInput,
  ...rest
}: FieldRenderProps<any, any> &
  Omit<React.ComponentProps<typeof Autocomplete>, 'renderInput'> & {
    renderInput: (
      params: AutocompleteRenderInputParams & {
        input: Omit<FieldRenderProps<any, any>['input'], 'value' | 'onChange'>
        meta: FieldRenderProps<any, any>['meta']
      }
    ) => React.ReactNode
  }): JSX.Element {
  const handleChange = React.useCallback(
    (event: any, value: any) => onChange(value),
    [onChange]
  )

  return (
    <Autocomplete
      {...rest}
      value={value}
      onChange={handleChange}
      onInputChange={handleChange}
      renderInput={(params: AutocompleteRenderInputParams): React.ReactNode =>
        renderInput({ ...params, input, meta })
      }
    />
  )
}
