import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

export default function useLogin() {
  return useMutation({
    mutationFn: async (credentials) => {
      const response = await axiosInstance.post(
        "/auth/Account/Login",
        credentials
      );

      return response;
    },
  });
}