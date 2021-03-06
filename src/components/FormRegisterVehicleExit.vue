<template>
  <div class="column col-3 q-mx-auto q-mt-lg">
    <span class="text-center text-subtitle2 q-my-sm">
      <h6 class="text-h6" data-id="title">
        {{ $t('message.layout.registerVehicleExit') }}
      </h6>
      <q-input
        v-model="location"
        data-id="input-location"
        class="q-py-sm"
        filled
        :label="$t('message.exit.byLocation')"
      />

      <q-input
        v-model="licensePlate"
        data-id="input-license-plate"
        class="q-py-sm"
        filled
        :label="$t('message.exit.byLicensePlate')"
      />

      <div>
        <q-btn
          data-id="btn-search"
          :label="$t('message.exit.search')"
          no-caps
          color="primary"
          @click="searchInvoiceByLocationOrByLicensePlate"
        />
        <q-btn
          :label="$t('message.general.reset')"
          no-caps
          class="q-ml-sm"
          flat
          color="primary"
          @click="reset"
        />
      </div>
    </span>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  getInvoiceByLicensePlateService,
  getInvoiceByParkingLocationService,
  Invoice,
} from '../../services/invoice-service';

import useMessages from '~/composables/useMessages';

const props = defineProps<{
  invoice: Invoice;
  location: string;
}>();

const emit = defineEmits(['setInvoiceAndCalculateParkingPrice']);

let location = ref<string>('');
let licensePlate = ref<string>('');

if (props.location) {
  location.value = props.location as string;
}

const messages = useMessages();
const { t } = useI18n({});
async function searchInvoiceByLocationOrByLicensePlate() {
  let invoiceQueryResult: Invoice[] = [];
  if (location.value) {
    invoiceQueryResult = await getInvoiceByParkingLocationService(
      location.value
    );
  } else if (licensePlate.value) {
    invoiceQueryResult = await getInvoiceByLicensePlateService(
      licensePlate.value
    );
  }
  if (invoiceQueryResult.length) {
    emit('setInvoiceAndCalculateParkingPrice', invoiceQueryResult[0]);
  } else {
    messages.notifyErrorMessage(t('message.exit.noResults'));
  }
}

function reset() {
  location.value = '';
  licensePlate.value = '';
}
</script>
<style lang="postcss"></style>
