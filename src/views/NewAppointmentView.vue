<script setup>
import { ref } from "vue";
import AppointmentForm from "../components/AppointmentForm.vue";
import CustomButton from "../components/common/CustomButton.vue";

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
      <CustomButton label="Reset" variant="secondary" @click="reset" />
      <CustomButton label="Create Appointment" type="submit" />
    </div>
  </form>
</template>

<style>
form {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: var(--gap);
}
</style>
