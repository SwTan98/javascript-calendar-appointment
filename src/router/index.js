import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
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
      component: () => import("../views/NewAppointmentView.vue"),
    },
  ],
});

export default router;
