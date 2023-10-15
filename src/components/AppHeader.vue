<script setup>
import { ref, reactive, computed, toRefs, onMounted } from 'vue';
import { HeartOutlined, ShoppingCartOutlined, DownOutlined } from '@ant-design/icons-vue';
import { router } from '@/router';

import { useAuthStore } from '@/stores/auth.store';
const authStore = useAuthStore();
const user = authStore?.user;

// methods
const goToSignIn = () => {
    router.push({ name: "signinpage" });
}
const goToHomePage = () => {
    router.push({ name: "homepage" });
}
const goToMenuPage = () => {
    router.push({ name: "menupage" });
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
    <a-row class="header-navbar-wrapper" align="middle">
        <a-col :span="4" offset="2">
            <div>CATFOOD</div>
        </a-col>
        <a-col :span="8">
            <a-row justify="space-around" class="navigate-wapper">
                <a-col>
                    <span role="button" @click="goToHomePage">
                        Home <span class="sr-only">(current)</span>
                    </span>
                </a-col>

                <a-col>
                    <span role="button" @click="goToMenuPage">
                        Menu
                    </span>
                </a-col>

                <a-col>
                    <span role="button" @click="goToHomePage">
                        About
                    </span>
                </a-col>

                <a-col>
                    <span role="button" @click="goToHomePage">
                        Contact
                    </span>
                </a-col>
            </a-row>
        </a-col>

        <a-col :span="8" offset="2">
            <a-row align="middle">
                <a-col :span="7">
                    <a-form>
                        <a-input placeholder="Tìm kiếm" />
                    </a-form>
                </a-col>

                <a-col :span="6" :offset="2">
                    <a-button type="primary" v-if="!user" @click="goToSignIn">Đăng Nhập</a-button>
                    <a-dropdown v-if="user" :trigger="['click']" arrow>
                        <span role="button" class="ant-dropdown-link" @click.prevent>
                            {{ user?.email }}
                        </span>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item>
                                    <span>Đơn Hàng Của Tôi</span>
                                </a-menu-item>
                                <a-menu-item role="button" @click="signout">
                                    <span>Đăng Xuất</span>
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </a-col>

                <a-col :span="6">
                    <a-row align="middle">
                        <a-col>
                            <HeartOutlined :style="{ fontSize: '24px' }" />
                        </a-col>
                        <a-col :offset="2">
                            <ShoppingCartOutlined :style="{ fontSize: '24px' }" />
                        </a-col>
                    </a-row>

                </a-col>
            </a-row>
        </a-col>
    </a-row>
    <a-divider />
</template>

<style>
.header-navbar-wrapper {
    margin: 20px 0px;
}
.navigate-wapper {
    font-weight: 600;
}
</style>
