import i18n from '@/i18next';
import useAuthStore from '@/store/useAuthStore';
import axios from 'axios';

const token = useAuthStore.getState().token;

const authAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BURL}`,
  headers:{
    "Authorization" : `Bearer ${token}`
  }
});

authAxiosInstance.interceptors.request.use( (config) => {
  config.headers["Accept-Language"] = i18n.language;
  return config;
});

export default authAxiosInstance;