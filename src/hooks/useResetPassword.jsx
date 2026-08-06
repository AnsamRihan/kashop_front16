import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

export default function useResetPassword() {
  return useMutation({
    mutationFn: async (info) => {
      const response = await axiosInstance.patch(
        "/auth/Account/ResetPassword",
        info
      );

      return response;
    },
  });
}