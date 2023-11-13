<script setup>
// import { ref, reactive, computed, toRefs, onMounted, watch } from 'vue';
import { router } from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import UserService from "@/services/user.service";
import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from '@ant-design/icons-vue';

// 
const authStore = useAuthStore();
let user = ref(authStore?.user);

// const cartStore = useCartStore();
// let cart = ref(cartStore?.getCart(user?.value?._id));

// // watch the state of user (signed in or out), cart to update navbar header
// watch(
//     [authStore, cartStore],
//     () => {
//         user.value = authStore?.user;
//         cart.value = cartStore?.getCart(user?.value?._id);
//     },
//     { deep: true }
// );



const goToProductManagementPage = () => {
    router.push({ name: "productmanagementpage" });
}
const goToUserManagementPage = () => {
    router.push({ name: "usermanagementpage" });
}
const goToOrderManagementPage = () => {
    router.push({ name: "ordermanagementpage" });
}



import { h, ref, watch } from 'vue';
const theme = ref('dark');
const selectedKeys = ref(['1']);
const openKeys = ref(['sub1']);
const items = ref([
    (user?.value?.role === "General Manager" || user?.value?.role === "Product Manager") && {
        key: '1',
        icon: () => h(MailOutlined),
        label: 'Quản Lý Sản Phẩm',
        title: 'Product Management',
    },
    (user?.value?.role === "General Manager" || user?.value?.role === "User Manager") && {
        key: '2',
        icon: () => h(CalendarOutlined),
        label: 'Quản Lý Người Dùng',
        title: 'User Management',
    },
    (user?.value?.role === "General Manager" || user?.value?.role === "Order Manager") && {
        key: '3',
        icon: () => h(CalendarOutlined),
        label: 'Quản Lý Đơn Hàng',
        title: 'Order Management',
    },
]);
const changeTheme = checked => {
    theme.value = checked ? 'dark' : 'light';
};

watch(selectedKeys, val => {
    if (val[0] === '1') {
        goToProductManagementPage();
    } else if (val[0] === '2') {
        goToUserManagementPage();
    } else if (val[0] === '3') {
        goToOrderManagementPage();
    }
});

</script>

<template>
    <div style="height: 100%">
        <!-- <a-switch :checked="theme === 'dark'" checked-children="Dark" un-checked-children="Light" @change="changeTheme" /> -->
        <!-- <br />
        <br /> -->
        <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys"
            style="width: 256px; height: 100%; padding-top: 80px; padding-right: 15px;" mode="inline" :theme="theme"
            :items="items" />
    </div>
</template>

<style>
.header-navbar-wrapper {
    margin: 20px 0px;
}

.navigate-wapper {
    font-weight: 600;
}
</style>
