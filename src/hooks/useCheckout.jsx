import authAxiosInstance from '@/api/authAxiosInstance';
import { useMutation } from '@tanstack/react-query'

export default function useCheckout() {

    return useMutation({
        mutationFn: async ({ PaymentMethod }) => {
            return await authAxiosInstance.post("/Checkouts", {
                PaymentMethod
            })
        }
    });
}
