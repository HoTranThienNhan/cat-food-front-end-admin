import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import SignInPage from "@/views/SignInPage.vue";
import SignUpPage from "@/views/SignUpPage.vue";
import ProductManagementPage from "@/views/ProductManagementPage.vue";
import UserManagementPage from "@/views/UserManagementPage.vue";
import OrderManagementPage from "@/views/OrderManagementPage.vue";

const routes = [
    {
        path: "/",
        name: "homepage",
        component: HomePage,
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
    // {
    //     path: "/menu",
    //     name: "menupage",
    //     component: MenuPage,
    // },
    // {
    //     path: "/order",
    //     name: "orderpage",
    //     component: OrderPage,
    // },
    // {
    //     path: "/ordersuccess",
    //     name: "ordersuccesspage",
    //     component: OrderSuccessPage,
    // },
    // {
    //     path: "/product/:id",
    //     name: "productpage",
    //     component: ProductPage,
    //     props: true // Truyền các biến trong $route.params vào làm props
    // },
    // {
    //     path: "/cart",
    //     name: "cartpage",
    //     component: CartPage,
    //     props: true // Truyền các biến trong $route.params vào làm props
    // },
    // {
    //     path: "/checkout",
    //     name: "checkoutpage",
    //     component: CheckOutPage,
    //     props: true // Truyền các biến trong $route.params vào làm props
    // },
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