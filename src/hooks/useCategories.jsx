import axiosInstance from '@/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export default function useCategories() {

    const { i18n } = useTranslation()

    const getCategories = async () => {
        const resopnse = await axiosInstance.get("/Categories?limit=8");
        return resopnse.data;
    }

    const query = useQuery({
        queryKey: ['Categories', i18n.language],
        queryFn: getCategories,
        staleTime: 1000 * 60 * 1
    })

    return query;
}
