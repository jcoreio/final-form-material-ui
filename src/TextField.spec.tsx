import * as React from 'react'
import { Form, Field } from 'react-final-form'
import { it } from 'mocha'
import { expect } from 'chai'
import { mount } from 'enzyme'
import delay from 'waait'
import TextField from '../src/TextField'
import _TextField from '@material-ui/core/TextField'

it(`TextField`, async function() {
  const comp = mount(
    <Form onSubmit={() => ({ test: 'submit error' })}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="test"
            component={TextField}
            validate={value =>
              value && /[^0-9]/.test(value) ? 'must be a number' : undefined
            }
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </Form>
  )
  await delay(0)
  comp.update()

  comp.find('input').simulate('focus')
  await delay(0)
  comp.update()

  comp.find('input').simulate('change', { target: { value: '2a4' } })
  await delay(0)
  comp.update()

  expect(comp.find(_TextField).prop('value')).to.equal('2a4')
  expect(comp.find(_TextField).prop('helperText')).to.equal(undefined)

  comp.find('input').simulate('blur')
  await delay(0)
  comp.update()

  expect(comp.find(_TextField).prop('helperText')).to.equal('must be a number')

  comp.find('input').simulate('change', { target: { value: '24' } })
  await delay(0)
  comp.update()

  expect(comp.find(_TextField).prop('helperText')).to.equal(undefined)

  comp.find('button').simulate('submit')
  await delay(0)
  comp.update()

  expect(comp.find(_TextField).prop('helperText')).to.equal('submit error')
})
