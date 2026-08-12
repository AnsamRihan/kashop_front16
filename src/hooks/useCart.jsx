import authAxiosInstance from '@/api/authAxiosInstance'
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export default function useCart() {
    const { i18n } = useTranslation();

    const getCart = async () => {
        const response = await authAxiosInstance.get("/Carts");
        return response.data;
    }

    const query = useQuery({
        queryKey: ["cart", i18n.language],
        queryFn: getCart,
        staleTime: 1000 * 60 * 5
    })

    return query
}
