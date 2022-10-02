import { ref } from "vue";
import { defineStore } from "pinia";

const useToast = defineStore("message", () => {
  const message = ref("");

  const add = (msg) => {
    message.value = msg;
  };

  const clear = () => {
    message.value = undefined;
  };
  return {
    message,
    add,
    clear,
  };
});

export default useToast;
