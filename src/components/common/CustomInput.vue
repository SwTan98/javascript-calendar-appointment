<script setup>
import { ref, watch } from "vue";
import useViewport from "../utils/useViewport";
import useDebounce from "../utils/useDebounce";
import useThrottle from "../utils/useThrottle";

const textareaRef = ref(null);
const { width } = useViewport();

const props = defineProps({
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

// auto-resize textarea
watch(
  [() => props.modelValue, () => width.value],
  useThrottle(
    // 100ms throttle to prevent excessive call when resizing
    useDebounce(async () => {
      // 10ms debounce to get accurate height on state change
      if (!textareaRef.value) return;
      textareaRef.value.style.setProperty("height", 0);
      textareaRef.value.style.setProperty(
        "height",
        `${textareaRef.value.scrollHeight + 20}px`
      );
    }, 10),
    100
  )
);
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
      ref="textareaRef"
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

<style scoped>
.input-group {
  flex-direction: column;
  display: flex;
}

.input-group > * {
  border-radius: var(--border-radius);
}

.input-group input,
.input-group select,
.input-group textarea {
  border: 1px solid var(--color-text);
  padding: 4px;
  background-color: var(--color-background-soft);
  color: var(--color-text);
}

textarea {
  resize: none;
  overflow-y: hidden;
  min-height: 100px;
}
</style>
