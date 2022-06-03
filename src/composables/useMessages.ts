import { useQuasar } from "quasar";

const useMessages = () => {
  const $q = useQuasar();
  return {
    notifyErrorMessage(message: string) {
      return $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: message,
      });
    },
    notifySucessMessage(message: string) {
      return $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: message,
      });
    },
  };
};

export default useMessages;
