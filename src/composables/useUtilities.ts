import { useUtilitiesStore } from '../stores/utilities-store';

const useUtilities = () => {
  const utilitiesStore = useUtilitiesStore();

  return {
    getConstantValueByName(name: string) {
      return utilitiesStore.getConstants.filter(
        (constant) => constant.name === name
      )[0]?.value;
    },
  };
};

export default useUtilities;
