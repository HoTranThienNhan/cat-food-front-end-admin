<script setup>
import { ref, reactive, computed, toRefs, onMounted, watch } from 'vue';
import { HeartOutlined, ShoppingCartOutlined, DownOutlined } from '@ant-design/icons-vue';
import { router } from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import UserService from "@/services/user.service";

// 
const authStore = useAuthStore();
let user = ref(authStore?.user);

// watch the state of user (signed in or out), cart to update navbar header
watch(
    [authStore],
    () => {
        user.value = authStore?.user;
    },
    { deep: true }
);

// methods
const goToSignIn = () => {
    router.push({ name: "signinpage" });
}
const signout = () => {
    try {
        authStore.signoutStore();
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <a-row class="header-navbar-wrapper" align="middle" style="background-color: #fff; padding: 24px 0px; margin: 0px;">
        <a-col :span="10" offset="2">
            <div>MEOW FOODIE</div>
        </a-col>

        <a-col :span="8" offset="2">
            <a-row align="middle">
                <a-col :span="10">
                    <a-form>
                        <a-input placeholder="Tìm kiếm" />
                    </a-form>
                </a-col>

                <a-col :span="6" :offset="2">
                    <a-button type="primary" v-if="!user" @click="goToSignIn">Đăng Nhập</a-button>
                    <a-dropdown v-if="user" :trigger="['click']" arrow>
                        <span role="button" class="ant-dropdown-link" @click.prevent style="font-weight: 600;">
                            {{ user?.name ? user?.name : user?.email }}
                        </span>
                        <template #overlay>
                            <a-menu>
                                <!-- <a-menu-item v-if="user?.isAdmin === true" role="button" @click="goToProductManagementPage">
                                    <span>Quản Lý Hệ Thống</span>
                                </a-menu-item> -->
                                <!-- <a-menu-item role="button" @click="goToOrderPage">
                                    <span>Đơn Hàng Của Tôi</span>
                                </a-menu-item> -->
                                <a-menu-item role="button" @click="signout">
                                    <span>Đăng Xuất</span>
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </a-col>

                <!-- <a-col :span="6">
                    <a-row align="middle">
                        <a-col>
                            <a-badge count="0" show-zero>
                                <HeartOutlined :style="{ fontSize: '24px' }" />
                            </a-badge>
                        </a-col>
                        <a-col :offset="4">
                            <a-badge :count="cart?.products?.length-1 > 0 ? cart?.products?.length-1 : 0" show-zero>
                                <ShoppingCartOutlined :style="{ fontSize: '24px' }" :role="button" @click="goToCartPage" />
                            </a-badge>
                        </a-col>
                    </a-row>

                </a-col> -->
            </a-row>
        </a-col>
    </a-row>
    <a-divider style="margin-bottom: 0px; margin-top: 0px;" />
</template>

<style>
.header-navbar-wrapper {
    margin: 20px 0px;
    position: fixed;
    width: 100%;
    z-index: 10;
}

.navigate-wapper {
    font-weight: 600;
}
</style>
