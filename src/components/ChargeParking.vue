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
        color="primary"
        no-caps
        @click="chargeAndReleaseParkingSpace"
      />
    </span>
  </div>
</template>
<script setup lang="ts">
import { date } from 'quasar';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  registerVehicleExitFromParkingSpace,
  Invoice,
} from '../../services/invoice-service';
import { changeParkingState } from '../../services/parking-service';

import useMessages from '~/composables/useMessages';
import { ParkingSpaceState } from '~/models/parkingSpaceState.enum';

const props = defineProps<{
  invoice: Invoice;
}>();

const formatDateTime = 'HH:mm a - DD/MM/YYYY';
const formattedEntryDatetime = computed(() => {
  if (props.invoice.entryDatetime) {
    return date.formatDate(props.invoice.entryDatetime, formatDateTime);
  }
  return '';
});

const formattedExitDatetime = computed(() => {
  if (props.invoice.exitDatetime) {
    return date.formatDate(props.invoice.exitDatetime, formatDateTime);
  }
  return '';
});

const messages = useMessages();
const { t } = useI18n({});
async function chargeAndReleaseParkingSpace() {
  await changeParkingState(
    props.invoice.parkingSpace.id,
    ParkingSpaceState.FREE
  );

  await registerVehicleExitFromParkingSpace(props.invoice);

  messages.notifySucessMessage(t('message.exit.succesfullPayment'));
}
</script>
<style lang="postcss"></style>
