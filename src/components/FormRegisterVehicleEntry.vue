<template>
  <div class="column col-3 q-mx-auto q-mt-lg">
    <span class="text-center text-subtitle2 q-my-sm">
      <h6 class="text-h6" data-id="title">
        {{ $t("message.layout.registerVehicleEntry") }}
      </h6>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          data-id="input-location"
          :disable="activeLocation"
          v-model="location"
          :label="$t('message.entry.location')"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type the location',
          ]"
        />

        <q-select
          v-model="vehicleType"
          :disable="activeType"
          :options="optionsVehicleType"
          option-label="label"
          option-value="value"
          emit-value
          map-options
          :label="$t('message.entry.vehicleType')"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type the vehicle type',
          ]"
        />

        <q-input
          filled
          v-model="licensePlate"
          :label="$t('message.entry.licensePlate')"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type the license plate',
          ]"
        />

        <q-input
          filled
          data-id="cylinder-capacity"
          type="number"
          v-model="cylinderCapacity"
          :label="$t('message.entry.cylinderCapacity')"
          lazy-rules
          v-if="vehicleType === VehicleType.MOTORCYCLE_TYPE"
          :rules="[
            (val) =>
              (val !== null && val !== '') ||
              'Please type cylinder capacity of motorcycle',
            (val) =>
              (val > 0 && val < 2000) || 'Please type a real cylinder capacity',
          ]"
        />

        <div>
          <q-btn
            data-id="btn-register"
            :label="$t('message.entry.register')"
            type="submit"
            color="primary"
            no-caps
          />
          <q-btn
            data-id="btn-reset"
            :label="$t('message.general.reset')"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            no-caps
          />
        </div>
      </q-form>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { ref } from "vue";
import { ParkingSpaceState } from "~/models/parkingSpaceState.enum";
import { VehicleType } from "~/models/vehicleType.enum";
import {
  Invoice,
  registerInvoiceVehicleEntry,
} from "../../services/invoice-service";
import {
  changeParkingState,
  getParkingSpaceByLocationService,
  ParkingSpace,
} from "../../services/parking-service";

const props = defineProps<{
  location?: string;
  vehicleType?: string;
}>();

let location = ref<string>("");
let vehicleType = ref<string>("");
let licensePlate = ref<string>("");
let cylinderCapacity = ref<number>(0);

let activeLocation = ref<boolean>(false);
let activeType = ref<boolean>(false);

if (props.location) {
  location.value = props.location as string;
  activeLocation.value = true;
}

if (props.vehicleType) {
  vehicleType.value = props.vehicleType as string;
  activeType.value = true;
}

const optionsVehicleType: { label: string; value: string }[] = [
  { label: "Car", value: VehicleType.CAR_TYPE },
  { label: "Motorcycle", value: VehicleType.MOTORCYCLE_TYPE },
];

const $q = useQuasar();
async function onSubmit() {
  let parkingSpaceResult: ParkingSpace[] =
    await getParkingSpaceByLocationService(location.value);

  if (!parkingSpaceResult.length) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "There are no parking spaces with this location",
    });
    return;
  }

  let parkingSpace = parkingSpaceResult[0];

  let invoice: Invoice = {
    id: -1,
    parkingSpace,
    licensePlate: licensePlate.value,
    open: true,
  };

  invoice.cylinderCapacity = cylinderCapacity.value;

  invoice = await registerInvoiceVehicleEntry(invoice);
  parkingSpace = await changeParkingState(
    parkingSpace.id,
    ParkingSpaceState.BUSY
  );

  $q.notify({
    color: "green-4",
    textColor: "white",
    icon: "cloud_done",
    message: "Parking space assigned successfully",
  });
}

function onReset() {
  location.value = "";
  vehicleType.value = "";
  licensePlate.value = "";
  cylinderCapacity.value = 0;
  activeLocation.value = false;
  activeType.value = false;
}
</script>
<style lang="postcss"></style>
