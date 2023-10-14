
<script setup>
import { ref, reactive, computed } from 'vue';

import SignInForm from "@/components/SignInForm.vue";
import UserService from "@/services/user.service";

import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
const user = authStore?.user;

let userInfo = reactive({});
let message = ref("");
let status = ref("");

const signin = async (data) => {
    try {
        await authStore.signinStore(data);

        await UserService.signin(data);
        message.value = "Đăng nhập thành công.";
        status.value = "OK";
    } catch (error) {
        message.value = error.response?.data?.message;
        status.value = "ERROR";
    }
}
</script>

<template>
    <div>SIGN IN</div>
    <SignInForm :user="userInfo" @submit:signin="signin" />
    <div>{{ user?.email }}</div>
    <p class="text-danger">{{ message }}</p>
</template>

<style></style>