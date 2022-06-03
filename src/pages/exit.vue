<template>
  <div class="row">
    <FormRegisterVehicleExit
      :invoice="invoice"
      :location="location"
      @set-invoice-and-calculate-parking-price="
        setInvoiceAndCalculateParkingPrice
      "
    />
  </div>
  <div class="row">
    <ChargeParking :invoice="invoice" v-show="showChargeSection" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Invoice } from "../../services/invoice-service";
import { calculateParkingPrice } from "../../services/invoice-service";

let location = ref<string>("");
let showChargeSection = ref<boolean>(false);

const route = useRoute();

if (route.params?.location) {
  location.value = route.params.location as string;
}

let invoice = ref<Invoice>({
  id: -1,
  parkingSpace: { id: -1, location: "", type: "", state: "" },
  licensePlate: "",
  open: true,
});

const setInvoiceAndCalculateParkingPrice = (invoiceResult: Invoice) => {
  invoice.value = invoiceResult;
  invoice.value = calculateParkingPrice(invoice.value);
  showChargeSection.value = true;
};
</script>
<style lang="postcss"></style>

<route lang="JSON5">
{
  name: "exit"
}
</route>
