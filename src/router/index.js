import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import SignInPage from "@/views/SignInPage.vue";
import MenuPage from "@/views/MenuPage.vue";
import ProductPage from "@/views/ProductPage.vue";

const routes = [
    {
        path: "/",
        name: "homepage",
        component: HomePage,
    },
    {
        path: "/signin",
        name: "signinpage",
        component: SignInPage,
    },
    {
        path: "/menu",
        name: "menupage",
        component: MenuPage,
    },
    {
        path: "/product/:id",
        name: "productpage",
        component: ProductPage,
        props: true // Truyền các biến trong $route.params vào làm props
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