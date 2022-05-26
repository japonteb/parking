<template>
  <div class="row">
    <div class="column col-3 q-mx-auto q-mt-lg">
      <span class="text-center text-subtitle2 q-my-sm">
        <h6 calss="text-h6">{{ $t("message.layout.registerVehicleExit") }}</h6>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="location"
            :label="$t('message.exit.byLocation')"
          />

          <q-input
            filled
            v-model="licensePlate"
            :label="$t('message.exit.byLicensePlate')"
          />

          <div>
            <q-btn
              :label="$t('message.exit.search')"
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

<script setup lang="ts"></script>

<style lang="postcss"></style>

<route lang="JSON5">
{
  name: "exit"
}
</route>
