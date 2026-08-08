import axiosInstance from '@/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export default function useCategories() {

    const { i18n } = useTranslation()

    const getCategories = async ({ limit=8 }) => {
        const resopnse = await axiosInstance.get("/Categories", {
                params:{
                    limit
                }
            }
        );
        return resopnse.data;
    }

    const query = useQuery({
        queryKey: ['Categories', i18n.language],
        queryFn: getCategories,
        staleTime: 1000 * 60 * 5
    })

    return query;
}
