import axiosInstance from '@/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export default function useProducts() {

    const { i18n } = useTranslation()

    const getProducts = async ({ 
        page=1,
        limit=8,
        sortBy='name',
        ascending=false
    }) => {

        const resopnse = await axiosInstance.get("/Products", {
                params:{
                    page,
                    limit,
                    sortBy,
                    ascending
                }
            }
        );
        return resopnse.data;
    }

    const query = useQuery({
        queryKey: ['Products', i18n.language],
        queryFn: getProducts,
        staleTime: 1000 * 60 * 5
    })

    return query;
}
