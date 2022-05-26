<template>
  <div class="row">
    <div class="column col-3 q-mx-auto q-mt-lg">
      <span class="text-center text-subtitle2 q-my-sm">
        <h6 class="text-h6">{{ $t("message.index.title") }}</h6>
        <p>{{ $t("message.index.subtitle") }}</p>
      </span>

      <div>
        <h6>Cars</h6>
        <div class="container">
          <div>
            <span class="text-caption">C1</span>
            <q-btn class="parkingSpace" icon="directions_car_filled" />
          </div>
          <div>
            <span class="text-caption">C2</span
            ><q-btn class="parkingSpace" icon="crop_free" />
          </div>
          <div>
            <span class="text-caption">C3</span
            ><q-btn class="parkingSpace" icon="directions_car_filled" />
          </div>
          <div>
            <span class="text-caption">C4</span
            ><q-btn class="parkingSpace" icon="crop_free" />
          </div>
          <div>
            <span class="text-caption">C5</span
            ><q-btn class="parkingSpace" icon="directions_car_filled" />
          </div>

          <div>
            <span class="text-caption">C6</span
            ><q-btn class="parkingSpace" icon="directions_car_filled" />
          </div>
          <div>
            <span class="text-caption">C7</span>
            <q-btn class="parkingSpace" icon="directions_car_filled" />
          </div>
          <div>
            <span class="text-caption">C8</span
            ><q-btn class="parkingSpace" icon="crop_free" />
          </div>
          <div>
            <span class="text-caption">C9</span
            ><q-btn class="parkingSpace" icon="directions_car_filled" />
          </div>
          <div>
            <span class="text-caption">C10</span
            ><q-btn class="parkingSpace" icon="crop_free" />
          </div>
          <div>
            <span class="text-caption">C11</span
            ><q-btn class="parkingSpace" icon="directions_car_filled" />
          </div>

          <div>
            <span class="text-caption">C12</span
            ><q-btn class="parkingSpace" icon="directions_car_filled" />
          </div>
          <div>
            <span class="text-caption">C13</span>
            <q-btn class="parkingSpace" icon="directions_car_filled" />
          </div>
          <div>
            <span class="text-caption">C14</span
            ><q-btn class="parkingSpace" icon="crop_free" />
          </div>
          <div>
            <span class="text-caption">C15</span
            ><q-btn class="parkingSpace" icon="directions_car_filled" />
          </div>
          <div>
            <span class="text-caption">C16</span
            ><q-btn class="parkingSpace" icon="crop_free" />
          </div>
          <div>
            <span class="text-caption">C17</span
            ><q-btn class="parkingSpace" icon="directions_car_filled" />
          </div>

          <div>
            <span class="text-caption">C18</span
            ><q-btn class="parkingSpace" icon="directions_car_filled" />
          </div>
          <div>
            <span class="text-caption">C19</span
            ><q-btn class="parkingSpace" icon="directions_car_filled" />
          </div>

          <div>
            <span class="text-caption">C20</span
            ><q-btn class="parkingSpace" icon="directions_car_filled" />
          </div>
        </div>

        <h6>Motorcycles</h6>
        <div class="container">
          <div>
            <span class="text-caption">M1</span>
            <q-btn class="parkingSpace" icon="crop_free" />
          </div>
          <div>
            <span class="text-caption">M2</span
            ><q-btn class="parkingSpace" icon="crop_free" />
          </div>
          <div>
            <span class="text-caption">M3</span
            ><q-btn class="parkingSpace" icon="two_wheeler" />
          </div>
          <div>
            <span class="text-caption">M4</span
            ><q-btn class="parkingSpace" icon="crop_free" />
          </div>
          <div>
            <span class="text-caption">M5</span
            ><q-btn class="parkingSpace" icon="two_wheeler" />
          </div>

          <div>
            <span class="text-caption">M6</span
            ><q-btn class="parkingSpace" icon="two_wheeler" />
          </div>
          <div>
            <span class="text-caption">M7</span
            ><q-btn class="parkingSpace" icon="crop_free" />
          </div>
          <div>
            <span class="text-caption">M8</span
            ><q-btn class="parkingSpace" icon="two_wheeler" />
          </div>
          <div>
            <span class="text-caption">M9</span
            ><q-btn class="parkingSpace" icon="crop_free" />
          </div>
          <div>
            <span class="text-caption">M10</span
            ><q-btn class="parkingSpace" icon="two_wheeler" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useParkingStore } from "../stores/parking-store";

const parkingStore = useParkingStore();
</script>

<style lang="postcss">
.container {
  background-color: #eee;
  border: 2px solid black;
  padding: 15px;
  max-width: 250px;
  min-height: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.parkingSpace {
  background-color: aqua;
  border: 2px solid blue;
  height: 60px;
  width: 40px;
  display: flex;
  flex-direction: column;
}
</style>

<route lang="JSON5">
{
  name: "index"
}
</route>
