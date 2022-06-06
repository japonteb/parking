import { shallowMount } from '@vue/test-utils';
import { Quasar } from 'quasar';
import { describe, expect, test } from 'vitest';

import { i18n } from '../../src/modules/i18n';

import ParkingSpaceComponent from '~/components/ParkingSpace.vue';

const defaultProps = {
  title: 'Cars',
  parkingSpace: [
    {
      id: 1,
      location: 'C1',
      type: 'car',
      state: 'free',
    },
    {
      id: 2,
      location: 'C2',
      type: 'car',
      state: 'busy',
    },
    {
      id: 3,
      location: 'C3',
      type: 'car',
      state: 'free',
    },
  ],
  spaceIcon: 'directions_car_filled',
};

const wrapperFactory = () =>
  shallowMount(ParkingSpaceComponent, {
    propsData: defaultProps,
    global: {
      plugins: [Quasar, i18n],
    },
  });
describe('ParkingSpaceComponent', () => {
  beforeEach(() => {
    expect(ParkingSpaceComponent).toBeTruthy();
  });

  test('should render correct title', () => {
    const wrapper = wrapperFactory();
    const title = wrapper.get('[data-id="title"]');
    expect(title.text()).toBe(defaultProps.title);
  });

  test('should render correct location', () => {
    const wrapper = wrapperFactory();
    const captions = wrapper.findAll('[data-id="location"]');
    expect(captions.length).toBe(defaultProps.parkingSpace.length);
  });

  test('should display the correct free parking space icon', () => {
    const wrapper = wrapperFactory();
    const icon = wrapper.findAll('[data-id="icon"]')[0];
    expect(icon.attributes('icon')).toBe('crop_free');
  });

  test('should display the correct busy car parking space icon', () => {
    const wrapper = wrapperFactory();
    const icon = wrapper.findAll('[data-id="icon"]')[1];
    expect(icon.attributes('icon')).toBe(defaultProps.spaceIcon);
  });
});
