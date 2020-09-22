import * as React from 'react'
import { Form, Field } from 'react-final-form'
import { it } from 'mocha'
import { expect } from 'chai'
import { mount } from 'enzyme'
import delay from 'waait'
import FormControl from './FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from './Checkbox'

it(`FormControl with Checkboxes`, async function() {
  let values
  const comp = mount(
    <Form onSubmit={() => ({ toppings: 'submit error' })}>
      {({ handleSubmit, values: v }) => {
        values = v
        return (
          <form onSubmit={handleSubmit}>
            <Field
              name="toppings"
              label="Toppings"
              component={FormControl}
              validate={value =>
                value?.length > 2 ? 'pick two or less' : undefined
              }
            >
              <FormGroup>
                <FormControlLabel
                  label="Pickles"
                  control={
                    <Field
                      name="toppings"
                      value="pickles"
                      type="checkbox"
                      component={Checkbox}
                    />
                  }
                />
                <FormControlLabel
                  label="Onions"
                  control={
                    <Field
                      name="toppings"
                      value="onions"
                      type="checkbox"
                      component={Checkbox}
                    />
                  }
                />
                <FormControlLabel
                  label="Tomatoes"
                  control={
                    <Field
                      name="toppings"
                      value="tomatoes"
                      type="checkbox"
                      component={Checkbox}
                    />
                  }
                />
              </FormGroup>
            </Field>
            <button type="submit">Submit</button>
          </form>
        )
      }}
    </Form>
  )
  await delay(0)
  comp.update()

  comp
    .find('input')
    .find({ value: 'pickles' })
    .simulate('focus')
  await delay(0)
  comp.update()

  comp
    .find('input')
    .find({ value: 'pickles' })
    .simulate('change', { target: { type: 'checkbox', checked: true } })
  await delay(0)
  comp.update()

  expect(values.toppings).to.deep.equal(['pickles'])

  expect(
    comp
      .find('input')
      .find({ value: 'pickles' })
      .prop('checked')
  ).to.be.true

  comp
    .find('input')
    .find({ value: 'pickles' })
    .simulate('blur')
  await delay(0)
  comp.update()

  expect(comp.find(FormHelperText)).to.have.lengthOf(0)

  comp
    .find('input')
    .find({ value: 'onions' })
    .simulate('focus')
  await delay(0)
  comp.update()

  comp
    .find('input')
    .find({ value: 'onions' })
    .simulate('change', { target: { type: 'checkbox', checked: true } })
  await delay(0)
  comp.update()

  expect(values.toppings).to.deep.equal(['pickles', 'onions'])

  expect(
    comp
      .find('input')
      .find({ value: 'onions' })
      .prop('checked')
  ).to.be.true

  expect(comp.find(FormHelperText)).to.have.lengthOf(0)

  comp
    .find('input')
    .find({ value: 'onions' })
    .simulate('blur')
  await delay(0)
  comp.update()

  comp
    .find('input')
    .find({ value: 'tomatoes' })
    .simulate('focus')
  await delay(0)
  comp.update()

  comp
    .find('input')
    .find({ value: 'tomatoes' })
    .simulate('change', { target: { type: 'checkbox', checked: true } })
  await delay(0)
  comp.update()

  expect(values.toppings).to.deep.equal(['pickles', 'onions', 'tomatoes'])
  expect(comp.find(FormHelperText).text()).to.equal('pick two or less')

  comp
    .find('input')
    .find({ value: 'tomatoes' })
    .simulate('change', { target: { type: 'checkbox', checked: false } })
  await delay(0)
  comp.update()

  expect(values.toppings).to.deep.equal(['pickles', 'onions'])
  expect(comp.find(FormHelperText)).to.have.lengthOf(0)

  comp
    .find('input')
    .find({ value: 'tomatoes' })
    .simulate('blur')
  await delay(0)
  comp.update()

  comp.find('button').simulate('submit')
  await delay(0)
  comp.update()

  expect(comp.find(FormHelperText).text()).to.equal('submit error')
})
