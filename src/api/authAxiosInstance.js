import i18n from "@/i18next";
import useAuthStore from "@/store/useAuthStore";
import axios from "axios";

const authAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BURL,
});

authAxiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  config.headers["Accept-Language"] = i18n.language;

  return config;
});

export default authAxiosInstance;