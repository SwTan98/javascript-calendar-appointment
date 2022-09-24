<script setup>
import { ref } from "vue";

const appointment = ref({});
const dentists = ["", "Dentist 1", "Dentist 2", "Dentist 3"];
const equipments = [
  "",
  "Compressor",
  "Suction Machine",
  "Scanner",
  "Hygiene Equipment",
];
const handleSubmit = (e) => {
  console.log(appointment.value);
  e.preventDefault();
};

const reset = () => {
  appointment.value = {};
};
</script>

<template>
  <form @submit="handleSubmit">
    <div class="input-group">
      <label for="input-date">Date / Time</label>
      <input
        id="input-date"
        type="datetime-local"
        v-model="appointment.date"
        step="60"
      />
    </div>
    <div class="input-group">
      <label for="input-dentist">Dentist</label>
      <select id="input-dentist" v-model="appointment.dentist">
        <option
          v-for="dentist in dentists"
          :key="dentist"
          v-bind:value="dentist"
        >
          {{ dentist }}
        </option>
      </select>
    </div>
    <div class="input-group">
      <label for="input-equipment">Equipment</label>
      <select id="input-equipment" v-model="appointment.equipment">
        <option
          v-for="equipment in equipments"
          :key="equipment"
          v-bind:value="equipment"
        >
          {{ equipment }}
        </option>
      </select>
    </div>
    <div class="input-group">
      <label for="input-notes">Notes</label>
      <textarea
        id="input-notes"
        rows="5"
        v-model="appointment.notes"
      ></textarea>
    </div>
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
