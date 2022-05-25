import { defineStore } from "pinia";

export const useParkingStore = defineStore("parking", {
  state: () => ({
    parking: 18,
  }),
  getters: {
    doubleParking: (state) => state.parking * 2,
  },
  actions: {
    increment() {
      this.parking++;
    },
  },
});
