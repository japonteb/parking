<template>
  <p data-id="title">{{ title }}:</p>
  <p data-id="hour-value">Hour: {{ hourValue }}</p>
  <p data-id="day-value">
    Day (from 8 hours to 24 hours of parking): {{ dayValue }}
  </p>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  hourValue?: number;
  dayValue?: number;
}>();
</script>

<style lang="postcss"></style>
