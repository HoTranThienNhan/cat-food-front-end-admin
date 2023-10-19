import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import SignInPage from "@/views/SignInPage.vue";
import SignUpPage from "@/views/SignUpPage.vue";
import MenuPage from "@/views/MenuPage.vue";
import ProductPage from "@/views/ProductPage.vue";
import CartPage from "@/views/CartPage.vue";
import CheckOutPage from "@/views/CheckOutPage.vue";

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
        path: "/signup",
        name: "signuppage",
        component: SignUpPage,
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
        path: "/cart",
        name: "cartpage",
        component: CartPage,
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/checkout",
        name: "checkoutpage",
        component: CheckOutPage,
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