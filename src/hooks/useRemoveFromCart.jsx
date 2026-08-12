import authAxiosInstance from '@/api/authAxiosInstance'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useRemoveFromCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ productId }) => {
            return await authAxiosInstance.delete(`/Carts/${productId}`);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            });
        },
    });
}