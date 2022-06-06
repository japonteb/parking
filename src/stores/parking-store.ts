import { defineStore } from 'pinia';

import {
  getParkingSpacesService,
  ParkingSpace,
} from '../../services/parking-service';

export type RootParkingState = {
  parkingSpaces: ParkingSpace[];
};

export const useParkingStore = defineStore('parkingStore', {
  state: () =>
    ({
      parkingSpaces: [],
    } as RootParkingState),

  getters: {
    getParkingSpaces: (state): ParkingSpace[] => {
      return state.parkingSpaces;
    },
  },
  actions: {
    async fetchParkingSpaces() {
      try {
        const data = await getParkingSpacesService();
        this.parkingSpaces = data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
