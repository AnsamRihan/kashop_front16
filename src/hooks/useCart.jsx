import authAxiosInstance from "@/api/authAxiosInstance";
import useAuthStore from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export default function useCart() {
    const { i18n } = useTranslation();

    const token = useAuthStore((state) => state.token);

    const getCart = async () => {
        const response = await authAxiosInstance.get("/Carts");
        return response.data;
    };

    const query = useQuery({
        queryKey: ["cart", i18n.language],
        queryFn: getCart,
        enabled: !!token,
        staleTime: 1000 * 60 * 5,
        retry: false,
    });

    return query;
}