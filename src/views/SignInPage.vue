
<script setup>
import { ref, reactive, computed } from 'vue';

import SignInForm from "@/components/SignInForm.vue";
import UserService from "@/services/user.service";
import { message } from 'ant-design-vue';

import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();
const user = authStore?.user;

let userInfo = reactive({});
let messageSignIn = ref("");
let status = ref("");

const signin = async (data) => {
    try {
        await authStore.signinStore(data);

        await UserService.signin(data);
        messageSignIn.value = "Đăng nhập thành công";
        message.success('Đăng nhập thành công', 3);
        status.value = "OK";
    } catch (error) {
        messageSignIn.value = error.response?.data?.message;
        status.value = "ERROR";
        message.error('Đăng nhập thất bại', 3);
    }
}
</script>

<template>
    <a-row>
        <a-col span="18">
            <a-card :bordered="false" style="width: 100%; background-color: #ccc;">
                <a-row justify="center">
                    <a-col>
                        <div style="font-weight: bold; font-size: 20px;">SIGN IN</div>
                    </a-col>
                </a-row>
                <a-row justify="center">
                    <a-col span="18">
                        <SignInForm :user="userInfo" @submit:signin="signin" />
                        <a-row class="error-message" justify="center">
                            <a-col>
                                {{ messageSignIn }}
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </a-card>
        </a-col>
    </a-row>
</template>

<style>
.error-message {
    color: red;
    align-items: center;
}
</style>