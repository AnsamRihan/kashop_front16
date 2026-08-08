import { create } from "zustand";
import useUserStore from "./useUserStore";

const useAuthStore = create( (set) => ({
    token: localStorage.getItem('accessToken'),
    setToken: (newToken) => {
        set({
            token: newToken
        });
        localStorage.setItem('accessToken', newToken);
    },
    logout: () =>{
        set({
            token: null
        });
        localStorage.removeItem('accessToken');
    }
}));

export default useAuthStore;