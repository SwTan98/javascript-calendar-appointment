<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import useUserStore from "./components/utils/useUserStore";
import CustomToast from "./components/common/CustomToast.vue";
import { computed } from "vue";

const user = useUserStore();
const route = useRoute();
const router = useRouter();

const handleLogout = () => {
  user.handleLogout();
  router.replace("/login");
};

const showName = computed(() => !route.meta.hideName);
const showNavbar = computed(() => !route.meta.hideNavBar);
</script>

<template>
  <header v-if="showNavbar">
    <nav>
      <RouterLink class="white" to="/"
        ><span class="material-icons">home</span></RouterLink
      >
      <a class="white" href="" @click.prevent="handleLogout">
        <span class="material-icons">logout</span>
      </a>
    </nav>
  </header>

  <main>
    <h1 class="route-name" v-if="showName">
      {{ route.name }}
    </h1>
    <RouterView />
  </main>
  <CustomToast />
</template>

<style scoped>
header {
  background-color: var(--secondary);
  line-height: 1.5;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 10;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  gap: var(--gap);
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  text-align: center;
  padding: 10px 20px;
}

nav a {
  display: flex;
  align-items: center;
}

nav a span {
  font-size: 36px;
}

main {
  padding: 1rem;
}

h1.route-name {
  margin-bottom: 1rem;
}
</style>
