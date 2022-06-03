<template>
  <div class="column col-3 q-mx-auto q-mt-lg">
    <span class="text-center text-subtitle2 q-my-sm">
      <p data-id="p-location">Location: {{ invoice.parkingSpace.location }}</p>
      <p data-id="p-license-plate">License Plate: {{ invoice.licensePlate }}</p>
      <p data-id="p-entry-date-time">
        Entry Date Time: {{ formattedEntryDatetime }}
      </p>
      <p data-id="p-exit-date-time">
        Exit Date Time: {{ formattedExitDatetime }}
      </p>
      <p data-id="p-price">Price: {{ invoice.price }}</p>
      <q-btn
        data-id="btn-charge"
        :label="$t('message.exit.charge')"
        @click="chargeAndReleaseParkingSpace"
        color="primary"
        no-caps
      />
    </span>
  </div>
</template>
<script setup lang="ts">
import { useQuasar } from "quasar";
import { date } from "quasar";
import {
  registerVehicleExitFromParkingSpace,
  Invoice,
} from "../../services/invoice-service";
import { changeParkingState } from "../../services/parking-service";
import { ParkingSpaceState } from "~/models/parkingSpaceState.enum";
import { computed } from "vue";

const props = defineProps<{
  invoice: Invoice;
}>();

const formatDateTime = "HH:mm a - DD/MM/YYYY";
const formattedEntryDatetime = computed(() => {
  if (props.invoice.entryDatetime) {
    return date.formatDate(props.invoice.entryDatetime, formatDateTime);
  }
  return "";
});

const formattedExitDatetime = computed(() => {
  if (props.invoice.exitDatetime) {
    return date.formatDate(props.invoice.exitDatetime, formatDateTime);
  }
  return "";
});

const $q = useQuasar();

async function chargeAndReleaseParkingSpace() {
  await changeParkingState(
    props.invoice.parkingSpace.id,
    ParkingSpaceState.FREE
  );

  await registerVehicleExitFromParkingSpace(props.invoice);

  $q.notify({
    color: "green-4",
    textColor: "white",
    icon: "cloud_done",
    message: "Successfull payment",
  });
}
</script>
<style lang="postcss"></style>
