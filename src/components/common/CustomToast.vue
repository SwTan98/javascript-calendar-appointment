<script setup>
import { ref } from "vue";
import useToast from "../utils/useToast";

const className = ref("toast");

const toast = useToast();

toast.$subscribe(() => {
  className.value = toast.show ? "toast toast-show" : "toast";
});
</script>

<template>
  <div :class="className">
    <span>
      {{ toast.message }}
    </span>
    <a class="toast-close white" href="" @click.prevent="toast.clear">
      <span class="material-icons">close</span>
    </a>
  </div>
</template>

<style scoped>
div.toast {
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: var(--primary);
  color: white;
  padding: 10px;
  margin: 10px;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  gap: var(--gap);
  opacity: 0;
  transition: 300ms opacity ease-in-out;
}

div.toast.toast-show {
  opacity: 1;
}

div.toast > span {
  font-weight: 600;
}

a.toast-close {
  width: 24px;
  height: 24px;
}
</style>
