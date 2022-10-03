<script setup>
import { ref } from "vue";
import useDialog from "../utils/useDialog";
import CustomButton from "./CustomButton.vue";

const className = ref("dialog");

const dialog = useDialog();

dialog.$subscribe(() => {
  className.value = dialog.show ? "dialog dialog-show" : "dialog";
});
</script>

<template>
  <div v-if="dialog.message" :class="className">
    <span>
      {{ dialog.message }}
    </span>
    <div class="dialog-buttons">
      <CustomButton
        :variant="dialog.buttonVariant.cancel"
        label="Cancel"
        @click="dialog.onCancel"
      />
      <CustomButton
        :variant="dialog.buttonVariant.confirm"
        label="Confirm"
        @click="dialog.onConfirm"
      />
    </div>
  </div>
</template>

<style scoped>
div.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: var(--color-background);
  box-shadow: 0 0 12px 4px var(--color-border);
  -webkit-box-shadow: 0 0 12px 4px var(--color-border);
  -moz-box-shadow: 0 0 12px 4px var(--color-border);
  border-radius: var(--border-radius);
  padding: 24px;
  opacity: 0;
  transition: 300ms opacity ease-in-out;
}

div.dialog.dialog-show {
  opacity: 1;
}

div.dialog-buttons {
  display: flex;
  gap: 24px;
}
</style>
