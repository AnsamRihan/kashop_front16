import authAxiosInstance from '@/api/authAxiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useClearCart() {
  const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            return await authAxiosInstance.delete("/Carts/clear")
        }, onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            })
        }
    })
}
