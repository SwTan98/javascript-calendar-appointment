import { ref } from "vue";
import { defineStore } from "pinia";

const useDialog = defineStore("dialog", () => {
  const defaultButtonVariant = {
    confirm: "primary",
    cancel: "tertiary",
  };

  const message = ref("");
  const show = ref(false);
  const onResolve = ref();
  const buttonVariant = ref(defaultButtonVariant);

  // add message, then show dialog
  const confirm = (msg, buttonVariantValue) => {
    message.value = msg;
    buttonVariant.value = { ...defaultButtonVariant, ...buttonVariantValue };
    setTimeout(() => {
      show.value = true;
    }, 500);
    return new Promise((resolve) => {
      onResolve.value = resolve;
    });
  };

  // hide dialog, then clear message
  const onClose = () => {
    show.value = false;
    setTimeout(() => (message.value = ""), 500);
  };

  const onConfirm = () => {
    onResolve.value(true);
    onClose();
  };

  const onCancel = () => {
    onResolve.value(false);
    onClose();
  };

  return {
    confirm,
    onConfirm,
    onCancel,
    message,
    buttonVariant,
    show,
  };
});

export default useDialog;
