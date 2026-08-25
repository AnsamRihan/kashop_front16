import authAxiosInstance from "@/api/authAxiosInstance";
import useUserStore from "@/store/useUserStore";
import useAuthStore from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function useProfile() {
    const { i18n } = useTranslation();

    const token = useAuthStore((state) => state.token);
    const setUser = useUserStore((state) => state.setUser);

    const getProfile = async () => {
        const response = await authAxiosInstance.get("/Profile");
        return response.data;
    };

    const query = useQuery({
        queryKey: ["Profile", i18n.language],
        queryFn: getProfile,
        enabled: !!token,
        staleTime: 1000 * 60 * 5,
        retry: false,
    });

    useEffect(() => {
        if (query.data) {
            setUser({
                fullName: query.data.fullName,
                email: query.data.email,
            });
        }
    }, [query.data, setUser]);

    return query;
}