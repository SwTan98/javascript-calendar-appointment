<script setup>
import { ref, watch, onBeforeMount } from "vue";
import { RouterLink } from "vue-router";
import dayjs from "dayjs";

const ColumnEnum = {
  DENTIST: "dentist",
  DATE: "date",
};
const columns = [ColumnEnum.DENTIST, ColumnEnum.DATE];
const sorter = ref(ColumnEnum.DATE);
const ascending = ref(true);
const appointments = ref([
  {
    id: "350df281-8849-4428-8829-b370f811119d",
    dentist: "Dentist 1",
    date: "2022-10-03 00:00:00",
  },
  {
    id: "ed25d594-a810-45f8-8fd2-c59f3512ec39",
    dentist: "Dentist 2",
    date: "2022-10-02 00:00:00",
  },
  {
    id: "65122577-b2bb-45ef-92f1-029518bb2e18",
    dentist: "Dentist 3",
    date: "2022-10-01 00:00:00",
  },
]);

const updateSorter = (e) => {
  const id = e.target.id;
  if (id === sorter.value) {
    ascending.value = !ascending.value;
    return;
  }
  sorter.value = id;
  ascending.value = true;
};

const sort = (sorter) => {
  if (sorter === ColumnEnum.DATE) {
    return appointments.value.sort((a, b) => dayjs(a.date) - dayjs(b.date));
  }
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

watch([sorter, ascending], ([sorter, ascending]) => {
  const sorted = sort(sorter);
  appointments.value = sorted;
  if (ascending) return;
  appointments.value.reverse();
});

onBeforeMount(() => sort(sorter.value));
</script>

<template>
  <div class="container">
    <RouterLink class="button" to="/new">
      <span class="material-icons"> add </span>
      <span class="button-description">Create New Appointment</span>
    </RouterLink>
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
          <td>{{ appointment.date }}</td>
        </tr>
      </tbody>
    </table>
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

table {
  text-align: left;
  border-collapse: collapse;
  min-width: 300px;
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
  padding: 8px 16px;
}

tbody tr:nth-of-type(even) {
  background-color: rgba(200, 200, 200, 0.2);
}
</style>
