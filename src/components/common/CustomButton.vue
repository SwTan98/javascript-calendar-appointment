<script setup>
defineProps({
  id: {
    type: String,
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "button",
  },
  variant: {
    type: String,
    default: "primary",
  },
});
</script>

<template>
  <button :id="id" :type="type" :class="variant" v-bind="$attrs">
    {{ label }}
  </button>
</template>

<style scoped>
button,
button.primary {
  color: white;
  border: none;
  background-color: var(--primary);
  font-size: 16px;
  font-weight: 500;
  border-radius: var(--border-radius);
  padding: 8px 16px;
  cursor: pointer;
  width: 50%;
}

button.secondary {
  background-color: var(--secondary);
}

button.tertiary {
  background-color: var(--tertiary);
}

button.danger {
  background-color: var(--danger);
}
</style>
