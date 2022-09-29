import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AppointmentFormView from "../views/AppointmentFormView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/new",
      name: "New Appointment",
      component: AppointmentFormView,
    },
    {
      path: "/appointment/:id",
      name: "Detail Appointment",
      component: AppointmentFormView,
      props: { mode: "read" },
    },
    {
      path: "/appointment/:id/edit",
      name: "Edit Appointment",
      component: AppointmentFormView,
      props: { mode: "edit" },
    },
  ],
});

export default router;
