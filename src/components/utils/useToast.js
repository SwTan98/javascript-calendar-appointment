import { ref } from "vue";
import { defineStore } from "pinia";

const useToast = defineStore("toast", () => {
  const message = ref("");
  const show = ref(false);

  // add message, then show toast
  const add = async (msg) => {
    message.value = msg;
    setTimeout(() => {
      show.value = true;
      clearAfterTimeout();
    }, 500);
  };

  // hide toast, then clear message
  const clear = () => {
    show.value = false;
    setTimeout(() => (message.value = ""), 500);
  };

  const clearAfterTimeout = () => setTimeout(clear, 10000);

  return {
    message,
    show,
    add,
    clear,
  };
});

export default useToast;
