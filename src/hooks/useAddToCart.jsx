import authAxiosInstance from '@/api/authAxiosInstance'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useAddToCart() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ ProductId, Count }) => {
            return await authAxiosInstance.post("/Carts", {
                ProductId,
                Count
            })
        }, onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            })
        }
    })
}
