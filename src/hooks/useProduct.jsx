import axiosInstance from '@/api/axiosInstance'
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export default function useProduct({ productID }) {

    const { i18n } = useTranslation();

    const getProduct = async ()=> {
        const response = await axiosInstance.get(`/Products/${productID}`);
        return response.data;
    }

    const query = useQuery({
        queryKey: ['product', productID, i18n.language],
        queryFn: getProduct,
        staleTime: 1000 * 60 * 5
    })

    return query;
}
