import i18n from '@/i18next';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BURL}`,
});

axiosInstance.interceptors.request.use( (config) => {
  config.headers["Accept-Language"] = i18n.language;
  return config;
});

export default axiosInstance;