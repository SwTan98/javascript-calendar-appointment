<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  options: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update:modelValue"]);

const handleUpdate = (e) => emit("update:modelValue", e.target.value);
</script>

<template>
  <div class="input-group">
    <label v-if="label" :for="id">{{ label }}</label>
    <!-- conditionally render select -->
    <select
      v-if="type === 'select'"
      :id="id"
      :value="modelValue"
      @input="handleUpdate"
      v-bind="$attrs"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <!-- conditionally render textarea -->
    <textarea
      v-else-if="type === 'textarea'"
      :id="id"
      :value="modelValue"
      @input="handleUpdate"
      v-bind="$attrs"
    ></textarea>
    <!-- fallback to normal input -->
    <input
      v-else
      :id="id"
      v-bind:type="type"
      :value="modelValue"
      @input="handleUpdate"
      v-bind="$attrs"
    />
  </div>
</template>
