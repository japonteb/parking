
import { mount } from '@vue/test-utils'
import { test, expect  } from 'vitest'
import { Quasar } from 'quasar'

import CounterPage from '~/pages/index.vue'

const wrapperFactory = () => mount(CounterPage, {
  global: {
    plugins: [Quasar]
  }
})

test('mount component', () => {
  expect(CounterPage).toBeTruthy()

  const wrapper = wrapperFactory()
  const count = wrapper.get('[data-id="counter"]')

  expect(count.text()).toContain('0')
  expect(wrapper.html()).toMatchSnapshot()
})

test('handle + click', async () => {
  const wrapper = wrapperFactory();
  const count = wrapper.get('[data-id="counter"]');
  const addBtn = wrapper.get('[data-id="add"]');

  await addBtn.trigger('click')

  expect(count.text()).toContain('1')
  
  await addBtn.trigger('click')
  
  expect(count.text()).toContain('2')
  expect(wrapper.html()).toMatchSnapshot()
})

test('handle test dialog was activated', async () => {
  const wrapper = wrapperFactory();
  const alertBtn = wrapper.get('[data-id="alertBtn"]');

  const dialog = wrapper.findComponent({name:"QDialog"})

  expect(dialog.vm.modelValue).toBe(false)
  await alertBtn.trigger('click')


  expect(dialog.vm.modelValue).toBe(true)
})
