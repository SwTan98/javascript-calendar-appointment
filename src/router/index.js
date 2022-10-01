import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AppointmentFormView from "../views/AppointmentFormView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import { useUserStore } from "../components/utils/useUserStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundView,
      meta: {
        publicAccess: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        publicAccess: true,
      },
    },
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

router.beforeEach((to) => {
  const user = useUserStore();
  if (!user.isLoggedIn && !to.meta.publicAccess) {
    return "/login";
  }
  if (user.isLoggedIn && to.path === "/login") {
    return "/";
  }
});

export default router;
