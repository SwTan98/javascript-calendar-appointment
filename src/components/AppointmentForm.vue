<script setup>
import data from "./config/equipments.json";
import CustomInput from "./common/CustomInput.vue";
const equipments = ["", ...data];
defineProps({
  date: {
    type: String,
    default: "",
  },
  dentist: {
    type: String,
    default: "",
  },
  equipment: {
    type: String,
    default: "",
  },
  note: {
    type: String,
    default: "",
  },
});
const emit = defineEmits([
  "update:date",
  "update:dentist",
  "update:equipment",
  "update:note",
]);
const handleInput = (e) => {
  const key = e.target.id.replace("input-", "");
  const value = e.target.value;
  emit(`update:${key}`, value);
};
</script>

<template>
  <CustomInput
    label="Date / Time"
    id="input-date"
    type="datetime-local"
    :modelValue="date"
    @input="handleInput"
    step="60"
    v-bind="$attrs"
    required
  />
  <CustomInput
    label="Dentist"
    id="input-dentist"
    type="text"
    :modelValue="dentist"
    @input="handleInput"
    v-bind="$attrs"
    required
  />
  <CustomInput
    label="Equipment"
    id="input-equipment"
    type="select"
    :options="equipments"
    :modelValue="equipment"
    @input="handleInput"
    v-bind="$attrs"
    required
  />
  <CustomInput
    label="Note"
    id="input-note"
    type="textarea"
    :modelValue="note"
    @input="handleInput"
    rows="5"
    v-bind="$attrs"
  />
</template>
