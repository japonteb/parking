import { shallowMount } from "@vue/test-utils";
import { Quasar } from "quasar";
import RateSpaceComponent from "~/components/RateSpace.vue";
import { i18n } from "../../src/modules/i18n";
import { describe, test, expect } from "vitest";

const defaultProps = {
  title: "Cars",
  hourValue: 4000,
  dayValue: 32000,
};

const wrapperFactory = () =>
  shallowMount(RateSpaceComponent, {
    propsData: defaultProps,
    global: {
      plugins: [Quasar, i18n],
    },
  });
describe("RateSpaceComponent", () => {
  beforeEach(() => {
    expect(RateSpaceComponent).toBeTruthy();
  });

  test("should render correct title", () => {
    const wrapper = wrapperFactory();
    const title = wrapper.get('[data-id="title"]');
    expect(title.text()).toContain(defaultProps.title);
  });

  test("should render correct title", () => {
    const wrapper = wrapperFactory();
    const hourValue = wrapper.get('[data-id="hour-value"]');
    expect(hourValue.text()).toContain(defaultProps.hourValue);
  });

  test("should render correct title", () => {
    const wrapper = wrapperFactory();
    const dayValue = wrapper.get('[data-id="day-value"]');
    expect(dayValue.text()).toContain(defaultProps.dayValue);
  });
});
