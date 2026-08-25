import authAxiosInstance from "@/api/authAxiosInstance";
import { useMutation } from "@tanstack/react-query";

export default function useUpdatePassword() {
    return useMutation({
        mutationFn: async (data) => {
            const response = await authAxiosInstance.patch(
                "/Profile/change-password",
                data
            );

            return response;
        },
    });
}