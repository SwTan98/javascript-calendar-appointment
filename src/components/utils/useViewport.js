import { computed, onMounted, onUnmounted, ref } from "vue";

const useViewport = () => {
  const windowWidth = ref(window.innerWidth);

  const onWidthChange = () => (windowWidth.value = window.innerWidth);

  const width = computed(() => windowWidth.value);

  onMounted(() => window.addEventListener("resize", onWidthChange));
  onUnmounted(() => window.removeEventListener("resize", onWidthChange));

  return { width };
};

export default useViewport;
