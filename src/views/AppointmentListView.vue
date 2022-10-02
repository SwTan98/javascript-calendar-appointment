<script setup>
import { ref, onBeforeMount } from "vue";
import { RouterLink } from "vue-router";
import AppointmentList from "../components/AppointmentList.vue";
import getAppointments from "../components/api/getAppointments";

const appointments = ref([]);
const loading = ref(true);

onBeforeMount(async () => {
  const data = await getAppointments();
  appointments.value = data;
  loading.value = false;
});
</script>

<template>
  <div class="container">
    <RouterLink class="button" to="/new">
      <span class="material-icons"> add </span>
      <span class="button-description">Create New Appointment</span>
    </RouterLink>
    <span class="information" v-if="loading">Loading...</span>
    <AppointmentList v-else-if="appointments.length" :value="appointments" />
    <span class="information" v-else> No appointments yet... </span>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
a.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap);
  padding: 8px 16px;
  background: none;
  border: none;
  border-radius: var(--border-radius);
  background-color: var(--primary);
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.button-description {
  display: none;
  font-size: 16px;
  font-weight: 500;
}

@media (min-width: 568px) {
  .button-description {
    display: block;
  }
}

span.information {
  margin: auto;
}
</style>
