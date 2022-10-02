<script setup>
import { ref, watch, onMounted } from "vue";
import { RouterLink } from "vue-router";
import dayjs from "dayjs";

const appointments = ref([]);

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
});

const ColumnEnum = {
  DENTIST: "dentist",
  DATE: "date",
};
const columns = [ColumnEnum.DENTIST, ColumnEnum.DATE];

const sorter = ref(ColumnEnum.DATE);
const ascending = ref(true);

// update sorting column, if column is the same, change direction
const updateSorter = (e) => {
  const id = e.target.id;
  if (id === sorter.value) {
    ascending.value = !ascending.value;
    return;
  }
  sorter.value = id;
  ascending.value = true;
};

// simple table sort function
const sort = (sorter) => {
  // date comparison
  if (sorter === ColumnEnum.DATE) {
    return appointments.value.sort((a, b) => dayjs(a.date) - dayjs(b.date));
  }
  // general comparison
  return appointments.value.sort((a, b) => {
    if (a[sorter] < b[sorter]) {
      return -1;
    }
    if (a[sorter] > b[sorter]) {
      return 1;
    }
    return 0;
  });
};

watch([sorter, ascending, appointments], ([sorter, ascending]) => {
  const sorted = sort(sorter);
  appointments.value = sorted;
  if (ascending) return;
  appointments.value.reverse();
});

onMounted(() => {
  appointments.value = [...props.value];
});
</script>

<template>
  <table>
    <thead>
      <tr @click="updateSorter">
        <th
          v-for="column in columns"
          :class="[
            'sortable',
            {
              ascending: sorter === column && ascending,
              descending: sorter === column && !ascending,
            },
          ]"
          role="button"
          :id="column"
          :key="column"
        >
          {{ column }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="appointment in appointments"
        :key="appointment.id"
        :id="appointment.id"
      >
        <td>
          <RouterLink :to="`/appointment/${appointment.id}`">{{
            appointment.dentist
          }}</RouterLink>
        </td>
        <td>{{ dayjs(appointment.date).format("DD/MM/YYYY hh:mmA") }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  text-align: left;
  border-collapse: collapse;
  min-width: 250px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

thead tr {
  border-bottom: 1px solid lightgrey;
}

th {
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  width: 50%;
  text-transform: capitalize;
}

th.sortable::after {
  font-family: "Material Icons";
  font-size: 18px;
  content: "\e5d7"; /* chevron up down */
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: currentColor;
}

th.ascending::after {
  content: "\e5cf"; /* chevron down */
}

th.descending::after {
  content: "\e5ce"; /* chevron up */
}

th:hover {
  filter: brightness(40%);
}

th,
td {
  padding: 16px;
}

tbody tr:nth-of-type(even) {
  background-color: rgba(200, 200, 200, 0.2);
}
</style>
