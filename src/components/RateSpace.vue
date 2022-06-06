<template>
  <p data-id="title">{{ title }}:</p>
  <p data-id="hour-value">{{ $t('message.index.hour') }} {{ hourValue }}</p>
  <p data-id="day-value">{{ $t('message.index.day') }} {{ dayValue }}</p>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  hourValue?: number;
  dayValue?: number;
}>();
</script>

<style lang="postcss"></style>
