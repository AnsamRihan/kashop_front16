import { create } from "zustand";

const useUserStore = create((set) => ({
    user: null,
    setUser: (newUser) => {
        set({
            user: newUser
        })
    },
    removeUser: () => {
        set({
            user: null
        })
    }
}));

export default useUserStore;