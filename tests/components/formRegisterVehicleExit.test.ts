import { shallowMount, mount, flushPromises } from "@vue/test-utils";
import { Quasar } from "quasar";
import FormRegisterVehicleExitComponent from "~/components/FormRegisterVehicleExit.vue";
import { i18n } from "../../src/modules/i18n";
import { describe, test, expect } from "vitest";
import {
  getInvoiceByParkingLocationService,
  getInvoiceByLicensePlateService,
  Invoice,
} from "../../services/invoice-service";

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
    getInvoiceByParkingLocationService: vi.fn(() =>
      Promise.resolve([defaultProps.invoice])
    ),
    getInvoiceByLicensePlateService: vi.fn(() =>
      Promise.resolve([defaultProps.invoice])
    ),
  };
});

const wrapperFactory = () =>
  shallowMount(FormRegisterVehicleExitComponent, {
    propsData: defaultProps,
    global: {
      plugins: [Quasar, i18n],
    },
  });

const wrapperFactoryMount = (props = defaultProps) =>
  mount(FormRegisterVehicleExitComponent, {
    propsData: props,
    global: {
      plugins: [Quasar, i18n],
    },
  });

describe("FormRegisterVehicleExitComponent", () => {
  beforeEach(() => {
    expect(FormRegisterVehicleExitComponent).toBeTruthy();
  });

  test("should render correct title", () => {
    const wrapper = wrapperFactory();
    const titleText = "Register Vehicle Exit";
    const title = wrapper.get('[data-id="title"]');
    expect(title.text()).toContain(titleText);
  });

  test("should search invoice by parking location in props", async () => {
    const wrapper = wrapperFactoryMount();
    const buttonSearch = wrapper.get('[data-id="btn-search"]');
    expect(getInvoiceByParkingLocationService).not.toHaveBeenCalled();
    expect(getInvoiceByLicensePlateService).not.toHaveBeenCalled();
    buttonSearch.trigger("click");
    await flushPromises();
    expect(getInvoiceByParkingLocationService).toHaveBeenCalledWith(
      defaultProps.location
    );
    expect(getInvoiceByLicensePlateService).not.toHaveBeenCalled();
  });

  test("should search invoice by parking location typing", async () => {
    const wrapper = wrapperFactoryMount({ ...defaultProps, location: "" });

    const buttonSearch = wrapper.get('[data-id="btn-search"]');
    const location = "C1";
    const inputLocation = wrapper.get('[data-id="input-location"]');

    expect(getInvoiceByParkingLocationService).not.toHaveBeenCalled();
    expect(getInvoiceByLicensePlateService).not.toHaveBeenCalled();

    await inputLocation.setValue(location);

    buttonSearch.trigger("click");

    await flushPromises();

    expect(getInvoiceByParkingLocationService).toHaveBeenCalledWith(location);
    expect(getInvoiceByLicensePlateService).not.toHaveBeenCalled();
  });

  test("should search invoice by parking location typing", async () => {
    const wrapper = wrapperFactoryMount({ ...defaultProps, location: "" });
    const buttonSearch = wrapper.get('[data-id="btn-search"]');
    const licensePlate = "hvn986";
    const inputLicensePlate = wrapper.get('[data-id="input-license-plate"]');

    expect(getInvoiceByParkingLocationService).not.toHaveBeenCalled();
    expect(getInvoiceByLicensePlateService).not.toHaveBeenCalled();

    await inputLicensePlate.setValue(licensePlate);

    buttonSearch.trigger("click");

    await flushPromises();

    expect(getInvoiceByParkingLocationService).not.toHaveBeenCalled();
    expect(getInvoiceByLicensePlateService).toHaveBeenCalledWith(licensePlate);
  });

  test("should emit an event when the charge button is clicked", async () => {
    const wrapper = wrapperFactoryMount();
    const buttonSearch = wrapper.get('[data-id="btn-search"]');
    buttonSearch.trigger("click");
    await flushPromises();
    expect(
      (
        wrapper.emitted(
          "setInvoiceAndCalculateParkingPrice"
        )?.[0] as Array<Invoice>
      )?.[0]
    ).toBe(defaultProps.invoice);
  });

  test("should call notify function from quasar when there are not results for this search", async () => {
    const wrapper = wrapperFactoryMount({ ...defaultProps, location: "" });
    wrapper.vm.$q.notify = vi.fn(() => {});

    const buttonSearch = wrapper.get('[data-id="btn-search"]');

    buttonSearch.trigger("click");

    await flushPromises();

    expect(wrapper.vm.$q.notify).toHaveBeenCalled();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
