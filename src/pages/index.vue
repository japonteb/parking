<template>
  <span class="text-center">
    <h6 data-id="title-index" class="text-h6">
      {{ $t("message.index.title") }}
    </h6>
    <p>{{ $t("message.index.subtitle") }}</p>
  </span>
  <div class="row justify-center">
    <div class="col col-4">
      <ParkingSpace
        :title="$t('message.index.cars')"
        :parkingSpace="parkingCarSpaces"
        spaceIcon="directions_car_filled"
      />
    </div>
    <div class="col col-4">
      <ParkingSpace
        :title="$t('message.index.motorcycles')"
        :parkingSpace="parkingMotorcycleSpaces"
        spaceIcon="two_wheeler"
      />
    </div>
  </div>
  <div>
    <span class="text-center">
      <h6 class="text-h6">{{ $t("message.index.rates") }}</h6>
      <RateSpace
        :title="$t('message.index.car')"
        :hourValue="carHourValue"
        :dayValue="carDayValue"
      />
      <RateSpace
        :title="$t('message.index.motorcycle')"
        :hourValue="motorcycleHourValue"
        :dayValue="motorcycleDayValue"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useUtilities from "~/composables/useUtilities";
import { ConstantBusiness } from "~/models/constants.enum";
import { VehicleType } from "~/models/vehicleType.enum";
import { useParkingStore } from "../stores/parking-store";
import { useUtilitiesStore } from "../stores/utilities-store";

const parkingStore = useParkingStore();

parkingStore.fetchParkingSpaces();

const parkingCarSpaces = computed(() => {
  return parkingStore.getParkingSpaces.filter(
    (parkingSpace) => parkingSpace.type === VehicleType.CAR_TYPE
  );
});

const parkingMotorcycleSpaces = computed(() => {
  return parkingStore.getParkingSpaces.filter(
    (parkingSpace) => parkingSpace.type === VehicleType.MOTORCYCLE_TYPE
  );
});

const utilitiesStore = useUtilitiesStore();
utilitiesStore.fetchConstantsBusiness();

const { getConstantValueByName } = useUtilities();

const carHourValue = computed(() => {
  return getConstantValueByName(ConstantBusiness.CAR_HOUR_VALUE);
});
const carDayValue = computed(() => {
  return getConstantValueByName(ConstantBusiness.CAR_DAY_VALUE);
});
const motorcycleHourValue = computed(() => {
  return getConstantValueByName(ConstantBusiness.MOTORCYCLE_HOUR_VALUE);
});
const motorcycleDayValue = computed(() => {
  return getConstantValueByName(ConstantBusiness.MOTORCYCLE_DAY_VALUE);
});
</script>

<style lang="postcss"></style>

<route lang="JSON5">
{
  name: "index"
}
</route>
