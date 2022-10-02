<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useToast from "../components/utils/useToast";
import AppointmentApi from "../components/api/AppointmentApi";
import AppointmentForm from "../components/AppointmentForm.vue";
import CustomButton from "../components/common/CustomButton.vue";
import form from "../components/config/form.json";

const router = useRouter();
const route = useRoute();
const toast = useToast();

const appointmentId = route.params.id;
const detailRoute = `/appointment/${appointmentId}`;

defineProps({
  mode: {
    type: String,
    default: "new",
  },
});

const defaultValues = ref({ ...form });
const appointment = ref({ ...form });

const handleSubmit = async () => {
  if (appointmentId) {
    // if appointment id exists, update appointment
    const result = await AppointmentApi.putAppointment(
      appointmentId,
      appointment.value
    );
    toast.add(result);
  } else {
    // create new appointment
    const result = await AppointmentApi.postAppointment(appointment.value);
    toast.add(result);
  }
  router.push("/");
};

const handleCancel = () => {
  reset();
  router.push(detailRoute);
};

const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this appointment?")) {
    return;
  }
  const result = await AppointmentApi.deleteAppointment(appointmentId);
  toast.add(result);
  router.push("/");
};

const handleEdit = () => router.push(`${detailRoute}/edit`);

const reset = () => {
  appointment.value = { ...defaultValues.value };
};

onBeforeMount(async () => {
  if (appointmentId === undefined) return;
  const data = await AppointmentApi.getAppointment(appointmentId);
  defaultValues.value = { ...data };
  appointment.value = { ...data };
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <AppointmentForm
      v-model:date="appointment.date"
      v-model:dentist="appointment.dentist"
      v-model:equipment="appointment.equipment"
      v-model:note="appointment.note"
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
  gap: calc(2 * var(--gap));
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: var(--gap);
}
</style>
