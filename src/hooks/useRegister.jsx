import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

export default function useRegister() {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await axiosInstance.post(
        "/auth/Account/Registers",
        userData
      );

      return response;
    },
  });
}