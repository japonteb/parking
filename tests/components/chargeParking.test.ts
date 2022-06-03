import { shallowMount, mount, flushPromises } from "@vue/test-utils";
import { Quasar } from "quasar";
import ChargeParking from "~/components/ChargeParking.vue";
import { i18n } from "../../src/modules/i18n";
import { describe, test, expect } from "vitest";
import { changeParkingState } from "../../services/parking-service";
import { registerVehicleExitFromParkingSpace } from "../../services/invoice-service";
import { ParkingSpaceState } from "~/models/parkingSpaceState.enum";

vi.mock("../../services/parking-service", () => {
  return {
    changeParkingState: vi.fn(() => Promise.resolve([])),
  };
});

vi.mock("../../services/invoice-service", () => {
  return {
    registerVehicleExitFromParkingSpace: vi.fn(() => Promise.resolve({})),
  };
});

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
    entryDatetime: "2022-06-02T12:39:06.542Z",
    exitDatetime: "2022-06-02T14:59:34.018Z",
    price: 1000,
  },
};

const wrapperFactory = () =>
  shallowMount(ChargeParking, {
    propsData: defaultProps,
    global: {
      plugins: [Quasar, i18n],
    },
  });

const wrapperFactoryMount = () =>
  mount(ChargeParking, {
    propsData: defaultProps,
    global: {
      plugins: [Quasar, i18n],
    },
  });

describe("ChargeParking", () => {
  beforeEach(() => {
    expect(ChargeParking).toBeTruthy();
  });

  test("should render correct title", () => {
    const wrapper = wrapperFactory();

    const pLocation = wrapper.get('[data-id="p-location"]');
    const pLicensePlate = wrapper.get('[data-id="p-license-plate"]');
    const pEntryDateTime = wrapper.get('[data-id="p-entry-date-time"]');
    const pExitDateTime = wrapper.get('[data-id="p-exit-date-time"]');
    const pPrice = wrapper.get('[data-id="p-price"]');

    expect(pLocation.text()).toContain(
      defaultProps.invoice.parkingSpace.location
    );
    expect(pLicensePlate.text()).toContain(defaultProps.invoice.licensePlate);
    expect(pEntryDateTime.text()).toContain("7:39 am - 02/06/2022");
    expect(pExitDateTime.text()).toContain("9:59 am - 02/06/2022");
    expect(pPrice.text()).toContain(defaultProps.invoice.price);
  });

  test("should call functions from services when the button Charge is clicked", async () => {
    const wrapper = wrapperFactoryMount();
    wrapper.vm.$q.notify = vi.fn(() => {});
    await flushPromises();
    const buttonCharge = wrapper.get('[data-id="btn-charge"]');
    expect(changeParkingState).not.toHaveBeenCalled();
    expect(registerVehicleExitFromParkingSpace).not.toHaveBeenCalled();
    buttonCharge.trigger("click");
    expect(changeParkingState).toHaveBeenCalledWith(
      defaultProps.invoice.parkingSpace.id,
      ParkingSpaceState.FREE
    );
    await flushPromises();
    expect(registerVehicleExitFromParkingSpace).toHaveBeenCalledWith(
      defaultProps.invoice
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
