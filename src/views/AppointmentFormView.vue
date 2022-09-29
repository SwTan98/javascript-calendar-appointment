<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppointmentForm from "../components/AppointmentForm.vue";
import CustomButton from "../components/common/CustomButton.vue";

const router = useRouter();
const route = useRoute();

const detailRoute = `/appointment/${route.params.id}`;

defineProps({
  mode: {
    type: String,
    default: "new",
  },
});

const appointment = ref({
  date: "",
  dentist: "",
  equipment: "",
  notes: "",
});

const handleSubmit = (e) => {
  console.log(appointment.value);
  e.preventDefault();
  router.push("/");
};

const handleCancel = () => router.push(detailRoute);

const handleDelete = () => {
  console.log(`Delete ${route.params.id}`);
};

const handleEdit = () => router.push(`${detailRoute}/edit`);

const reset = () => {
  appointment.value = {
    date: "",
    dentist: "",
    equipment: "",
    notes: "",
  };
};

const mockFetch = () => {
  appointment.value = {
    date: "2022-02-02 02:02",
    dentist: "Dentist 1",
    equipment: "Compressor",
    notes: "Lorem Ipsum",
  };
};

if (route.params.id) {
  mockFetch();
}
</script>

<template>
  <form @submit="handleSubmit">
    <AppointmentForm
      v-model:date="appointment.date"
      v-model:dentist="appointment.dentist"
      v-model:equipment="appointment.equipment"
      v-model:notes="appointment.notes"
      :disabled="mode === 'read'"
    />
    <div v-if="mode === 'read'" class="button-group">
      <CustomButton label="Delete" variant="danger" @click="handleDelete" />
      <CustomButton label="Edit" variant="primary" @click="handleEdit" />
    </div>
    <div v-else class="button-group">
      <CustomButton
        v-if="mode === 'new'"
        label="Reset"
        variant="tertiary"
        @click="reset"
      />
      <CustomButton
        v-else
        label="Cancel"
        variant="tertiary"
        @click="handleCancel"
      />
      <CustomButton label="Save" type="submit" />
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
