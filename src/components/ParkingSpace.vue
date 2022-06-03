<template>
  <div>
    <h6 data-id="title">{{ title }}</h6>
    <div class="container">
      <div v-for="space in parkingSpace" :key="space.id">
        <span data-id="location" class="text-caption">{{
          space.location
        }}</span>
        <q-btn
          data-id="icon"
          class="parkingSpace"
          :icon="space.state === 'free' ? 'crop_free' : spaceIcon"
          :to="
            space.state === 'free'
              ? {
                  name: 'entry',
                  params: {
                    location: space.location,
                    type: space.type,
                  },
                }
              : {
                  name: 'exit',
                  params: {
                    location: space.location,
                  },
                }
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ParkingSpace } from "services/parking-service";

const props = defineProps<{
  title: string;
  parkingSpace: ParkingSpace[];
  spaceIcon: string;
}>();
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
