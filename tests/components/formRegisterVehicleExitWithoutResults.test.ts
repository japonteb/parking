import { mount, flushPromises } from "@vue/test-utils";
import { Quasar } from "quasar";
import FormRegisterVehicleExitComponent from "~/components/FormRegisterVehicleExit.vue";
import { i18n } from "../../src/modules/i18n";
import { describe, test, expect } from "vitest";

const defaultProps = {
  invoice: {
    id: 1,
    parkingSpace: {
      id: 1,
      location: "C1",
      type: "car",
      state: "free",
    },
    licensePlate: "ABC123",
    cylinderCapacity: 0,
    open: true,
  },
  location: "C1",
};

vi.mock("../../services/invoice-service", () => {
  return {
    getInvoiceByParkingLocationService: vi.fn(() => Promise.resolve([])),
    getInvoiceByLicensePlateService: vi.fn(() => Promise.resolve([])),
  };
});

const wrapperFactoryMount = (props = defaultProps) =>
  mount(FormRegisterVehicleExitComponent, {
    propsData: props,
    global: {
      plugins: [Quasar, i18n],
    },
  });

describe("FormRegisterVehicleExitComponentWithoutResults", () => {
  beforeEach(() => {
    expect(FormRegisterVehicleExitComponent).toBeTruthy();
  });

  test("should show error message with a location that does not exists", async () => {
    const wrapper = wrapperFactoryMount({ ...defaultProps, location: "" });
    wrapper.vm.$q.notify = vi.fn(() => {});

    const buttonSearch = wrapper.get('[data-id="btn-search"]');
    const location = "D1";
    const inputLocation = wrapper.get('[data-id="input-location"]');

    await inputLocation.setValue(location);

    buttonSearch.trigger("click");

    await flushPromises();

    expect(wrapper.vm.$q.notify).toHaveBeenCalled();
  });

  test("should show error message with a license plate that does not exists", async () => {
    const wrapper = wrapperFactoryMount({ ...defaultProps, location: "" });
    wrapper.vm.$q.notify = vi.fn(() => {});

    const buttonSearch = wrapper.get('[data-id="btn-search"]');
    const licensePlate = "q1";
    const inputLicensePlate = wrapper.get('[data-id="input-license-plate"]');

    await inputLicensePlate.setValue(licensePlate);

    buttonSearch.trigger("click");

    await flushPromises();

    expect(wrapper.vm.$q.notify).toHaveBeenCalled();
  });

  test("should show error message without location neither license plate", async () => {
    const wrapper = wrapperFactoryMount({ ...defaultProps, location: "" });
    wrapper.vm.$q.notify = vi.fn(() => {});

    const buttonSearch = wrapper.get('[data-id="btn-search"]');

    const inputLocation = wrapper.get('[data-id="input-location"]');
    await inputLocation.setValue("");

    const inputLicensePlate = wrapper.get('[data-id="input-license-plate"]');
    await inputLicensePlate.setValue("");

    buttonSearch.trigger("click");

    await flushPromises();

    expect(wrapper.vm.$q.notify).toHaveBeenCalled();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
