<template>
  <div class="row">
    <FormRegisterVehicleEntry :location="location" :vehicleType="vehicleType" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

let location = ref<string>("");
let vehicleType = ref<string>("");

if (route.params?.location) {
  location.value = route.params.location as string;
}

if (route.params?.location) {
  vehicleType.value = route.params.type as string;
}
</script>

<style lang="postcss"></style>

<route lang="JSON5">
{
  name: "entry"
}
</route>
