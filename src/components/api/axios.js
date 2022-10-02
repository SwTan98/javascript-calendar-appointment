import axios from "axios";
import useUserStore from "../utils/useUserStore";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_GATEWAY,
});

instance.interceptors.request.use(async (config) => {
  const user = useUserStore();
  const session = await user.getSession();
  return {
    ...config,
    headers: {
      ...config.headers,
      ...session.headers,
    },
  };
});

export default instance;
