<template>
  <div class="row">
    <div class="column col-3 q-mx-auto q-mt-lg">
      <span class="text-center text-subtitle2 q-my-sm">
        <h6 calss="text-h6">{{ $t("message.layout.registerVehicleEntry") }}</h6>

        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="location"
            :label="$t('message.entry.location')"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-select
            v-model="vehicleType"
            :options="optionsVehicleType"
            :label="$t('message.entry.vehicleType')"
          />

          <q-input
            filled
            v-model="licensePlate"
            :label="$t('message.entry.licensePlate')"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="cylinderCapacity"
            :label="$t('message.entry.cylinderCapacity')"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <div>
            <q-btn
              :label="$t('message.entry.register')"
              type="submit"
              color="primary"
              no-caps
            />
            <q-btn
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
let vehicleType: string = ref("");
const optionsVehicleType: string[] = ["Car", "Motorcycle"];
</script>

<style lang="postcss"></style>

<route lang="JSON5">
{
  name: "entry"
}
</route>
