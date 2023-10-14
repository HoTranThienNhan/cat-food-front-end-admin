import { defineStore } from 'pinia';

import { router } from '@/router';

import UserService from "@/services/user.service";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user'))
    }),
    actions: {
        async signinStore(data) {
            try {
                const isSignedIn = await UserService.signin(data);

                if (isSignedIn) {
                    // update pinia state
                    this.user = data;

                    // store user details in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(this.user));

                    // redirect to homepage
                    router.push({ name: "homepage" });
                }
            } catch (error) {
                console.log(error);
            }
        },
        signoutStore() {
            this.user = null;
            localStorage.removeItem('user');
            router.push({ name: "signinpage" });
        }
    },
    persist: true,
});