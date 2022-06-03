import { Constant } from "./../../services/utilities-service";
import { defineStore } from "pinia";
import { getConstantsBusinessService } from "../../services/utilities-service";

export type RootConstantState = {
  constants: Constant[];
};

export const useUtilitiesStore = defineStore("utilitiesStore", {
  state: () =>
    ({
      constants: [],
    } as RootConstantState),

  getters: {
    getConstants: (state): Constant[] => {
      return state.constants;
    },
  },
  actions: {
    async fetchConstantsBusiness() {
      try {
        const data = await getConstantsBusinessService();
        this.constants = data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
