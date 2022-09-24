<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink class="white" to="/"
        ><span class="material-icons">home</span></RouterLink
      >
      <RouterLink class="white" to="">
        <span class="material-icons"> account_circle </span>
      </RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
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
</style>
