<template>
  <div class="row">
    <div class="column col-3 q-mx-auto q-mt-lg">
      <span class="text-center text-subtitle2 q-my-sm">
        Count:
        <span data-id="counter">{{ counter }}</span>
      </span>
      <q-btn data-id="add" @click="add()">+</q-btn>
      <q-btn data-id="alertBtn" @click="doAlert" class="q-mt-xl" color="negative" >Alert</q-btn>
    </div>
  </div>
      <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const counter = ref(0);
const alert = ref(false);

function add() {
  counter.value += 1;
}

function doAlert() {
  enableAlert()
}

function enableAlert() {
alert.value = true;
}
</script>

<style lang="postcss"></style>

<route lang="JSON5">
{
  name: "index"
}
</route>
