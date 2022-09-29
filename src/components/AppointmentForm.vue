<script setup>
import CustomInput from "./common/CustomInput.vue";
const dentists = ["", "Dentist 1", "Dentist 2", "Dentist 3"];
const equipments = [
  "",
  "Compressor",
  "Suction Machine",
  "Scanner",
  "Hygiene Equipment",
];
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
  notes: {
    type: String,
    default: "",
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits([
  "update:date",
  "update:dentist",
  "update:equipment",
  "update:notes",
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
    :value="date"
    @input="handleInput"
    step="60"
    :disabled="readOnly"
  />
  <CustomInput
    label="Dentist"
    id="input-dentist"
    type="select"
    :options="dentists"
    :value="dentist"
    @input="handleInput"
    :disabled="readOnly"
  />
  <CustomInput
    label="Equipment"
    id="input-equipment"
    type="select"
    :options="equipments"
    :value="equipment"
    @input="handleInput"
    :disabled="readOnly"
  />
  <CustomInput
    label="Notes"
    id="input-notes"
    type="textarea"
    :value="notes"
    @input="handleInput"
    rows="5"
    :disabled="readOnly"
  />
</template>
