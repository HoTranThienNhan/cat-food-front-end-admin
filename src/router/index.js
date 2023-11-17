import { createWebHistory, createRouter } from "vue-router";
import AdminHomePage from "@/views/AdminHomePage.vue";
import SignInPage from "@/views/SignInPage.vue";
import SignUpPage from "@/views/SignUpPage.vue";
import ProductManagementPage from "@/views/ProductManagementPage.vue";
import UserManagementPage from "@/views/UserManagementPage.vue";
import OrderManagementPage from "@/views/OrderManagementPage.vue";

const routes = [
    {
        path: "/admin/homepage",
        name: "adminhomepage",
        component: AdminHomePage,
    },
    {
        path: "/admin/signin",
        name: "signinpage",
        component: SignInPage,
    },
    {
        path: "/admin/signup",
        name: "signuppage",
        component: SignUpPage,
    },
    {
        path: "/admin/management/product",
        name: "productmanagementpage",
        component: ProductManagementPage,
    },
    {
        path: "/admin/management/user",
        name: "usermanagementpage",
        component: UserManagementPage,
    },
    {
        path: "/admin/management/order",
        name: "ordermanagementpage",
        component: OrderManagementPage,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfoundpage",
        component: () => import("@/views/NotFound.vue"),
    },
];

export const router = createRouter({
    history: createWebHistory(!import.meta.env.BASE_URL),
    routes,
});

export default router;