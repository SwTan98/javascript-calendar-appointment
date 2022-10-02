import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AppointmentFormView from "../views/AppointmentFormView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import useUserStore from "../components/utils/useUserStore";
import { ref } from "vue";

const firstLoad = ref(true);

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

router.beforeEach(async (to) => {
  const user = useUserStore();

  // fetch user on first load
  if (firstLoad.value) {
    await user.checkIsLoggedIn();
    firstLoad.value = false;
  }

  // redirect to login
  if (!user.isLoggedIn && !to.meta.publicAccess) {
    return "/login";
  }

  // redirect to main page
  if (user.isLoggedIn && to.path === "/login") {
    return "/";
  }
});

export default router;
