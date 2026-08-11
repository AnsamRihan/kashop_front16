import axiosInstance from '@/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export default function useProductsByCategory({
    categoryID
}) {

    const { i18n } = useTranslation();

    const getProductsByCategory = async () => {
        const response = axiosInstance.get(`/Products/category/${categoryID}`)
        return (await response).data;
    }

    const query = useQuery({
        queryKey: ["Category", categoryID, i18n.language],
        queryFn: getProductsByCategory,
        staleTime: 1000 * 60 * 5
    })
    
    return query;
}
