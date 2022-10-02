<script setup>
import useToast from "../utils/useToast";

const toast = useToast();
</script>

<template>
  <div v-if="toast.message" class="toast">
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
  position: absolute;
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
}

div.toast > span {
  font-weight: 600;
}

a.toast-close {
  width: 24px;
  height: 24px;
}
</style>
