import authAxiosInstance from '@/api/authAxiosInstance';
import { useMutation } from '@tanstack/react-query';

export default function useUpdateEmail() {
    return useMutation({
        mutationFn: async ({ NewEmail }) => {
            return await authAxiosInstance.patch("/Profile/change-email", {
                NewEmail
            });
        }
    });
}