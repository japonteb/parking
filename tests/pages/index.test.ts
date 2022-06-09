import { createTestingPinia } from '@pinia/testing';
import { mount, shallowMount } from '@vue/test-utils';
import { Quasar } from 'quasar';
import { describe, expect, test } from 'vitest';

import { i18n } from '../../src/modules/i18n';

import IndexPage from '~/pages/index.vue';

const wrapperFactoryShallowMount = () =>
  shallowMount(IndexPage, {
    global: {
      plugins: [Quasar, createTestingPinia(), i18n],
    },
  });

const wrapperFactoryMount = () =>
  mount(IndexPage, {
    global: {
      plugins: [Quasar, createTestingPinia(), i18n],
    },
  });

describe('Index', () => {
  test('shallowMount component', () => {
    expect(IndexPage).toBeTruthy();

    const wrapper = wrapperFactoryShallowMount();
    const title = wrapper.get('[data-id="title-index"]');

    expect(title.text()).toContain('Welcome to Parking App');
  });

  test('mount component', async () => {
    expect(IndexPage).toBeTruthy();

    const wrapper = wrapperFactoryMount();
    const title = wrapper.get('[data-id="title-index"]');
    console.log(title.html());
  });
});
