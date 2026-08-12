import authAxiosInstance from "@/api/authAxiosInstance";
import { useMutation } from "@tanstack/react-query";

export default function usePostReview() {
    return useMutation({
        mutationFn: async ({productID, Rating, Comment}) => {
            const response = await authAxiosInstance.post(
                `/Products/${productID}/reviews`,
                {Rating, Comment}
            );

            return response;
        },
    });
}
