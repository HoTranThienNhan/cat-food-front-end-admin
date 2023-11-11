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
                const isSignedIn = await UserService.signinAdmin(data);
                const userEmail = JSON.parse(JSON.stringify(data))?.email;

                const userData = await UserService.getUserDetailsByEmail(userEmail);

                if (isSignedIn) {
                    // update pinia state
                    this.user = userData;

                    // store user details in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(this.user));

                    // redirect to product management page
                    router.push({ name: "productmanagementpage" });
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