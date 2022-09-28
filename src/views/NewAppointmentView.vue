<script setup>
import { ref } from "vue";
import AppointmentForm from "../components/AppointmentForm.vue";

const appointment = ref({
  date: "",
  dentist: "",
  equipment: "",
  notes: "",
});
const handleSubmit = (e) => {
  console.log(appointment.value);
  e.preventDefault();
};

const reset = () => {
  appointment.value = {
    date: "",
    dentist: "",
    equipment: "",
    notes: "",
  };
};
</script>

<template>
  <form @submit="handleSubmit">
    <AppointmentForm
      v-model:date="appointment.date"
      v-model:dentist="appointment.dentist"
      v-model:equipment="appointment.equipment"
      v-model:notes="appointment.notes"
    />
    <div class="button-group">
      <button class="reset" type="button" @click="reset">Reset</button>
      <button type="submit">Create Appointment</button>
    </div>
  </form>
</template>

<style>
form {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

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
}

textarea {
  resize: vertical;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: var(--gap);
}

button {
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

button.reset {
  background-color: gray;
}
</style>
