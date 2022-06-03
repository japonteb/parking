import { shallowMount, mount, flushPromises } from "@vue/test-utils";
import { Quasar } from "quasar";
import FormRegisterVehicleEntryComponent from "~/components/FormRegisterVehicleEntry.vue";
import { i18n } from "../../src/modules/i18n";
import { describe, test, expect } from "vitest";

const defaultPropsCar = {
  location: "C1",
  vehicleType: "car",
};

const defaultPropsMotorcycle = {
  location: "M1",
  vehicleType: "motorcycle",
};

const wrapperFactory = (defaultProps = defaultPropsCar) =>
  shallowMount(FormRegisterVehicleEntryComponent, {
    propsData: defaultProps,
    global: {
      plugins: [Quasar, i18n],
    },
  });

const wrapperFactoryMount = (defaultProps = defaultPropsCar) =>
  mount(FormRegisterVehicleEntryComponent, {
    propsData: defaultProps,
    global: {
      plugins: [Quasar, i18n],
    },
  });

describe("FormRegisterVehicleEntryComponent", () => {
  beforeEach(() => {
    expect(FormRegisterVehicleEntryComponent).toBeTruthy();
  });

  test("should render correct title", () => {
    const wrapper = wrapperFactory();
    const titleText = "Register Vehicle Entry";
    const title = wrapper.get('[data-id="title"]');
    expect(title.text()).toContain(titleText);
  });

  test("should not render cylinder capacity when vehicle type is a car", () => {
    const wrapper = wrapperFactoryMount();
    const cylinderCapacity = wrapper.find('[data-id="cylinder-capacity"]');
    expect(cylinderCapacity.exists()).toBe(false);
  });

  test("should render cylinder capacity when vehicle type is a motorcycle", () => {
    const wrapper = wrapperFactoryMount(defaultPropsMotorcycle);
    const cylinderCapacity = wrapper.find('[data-id="cylinder-capacity"]');
    expect(cylinderCapacity.exists()).toBe(true);
  });
});
