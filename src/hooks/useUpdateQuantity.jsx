import authAxiosInstance from '@/api/authAxiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useUpdateQuantity() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ productId, count}) => {
            return await authAxiosInstance.patch(`/Carts/${productId}`, {
                count
            });
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            });
        },
    })
}
