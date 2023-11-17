<script setup>

import { useAuthStore } from '@/stores/auth.store';
import { router } from '@/router';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const user = authStore?.user;

</script>

<template>
    <a-row style="margin: 150px 50px 0px 50px;">
        <a-col align="middle" span="24">
            <h3>Chào Mừng Đến Với Admin Dashboard</h3>
        </a-col>
        <a-col align="middle" span="24">
            <span>Meow Foodie Admin sẽ luôn đồng hành và hỗ trợ bạn trong việc quản lý hệ thống.</span>
        </a-col>
        <a-col align="middle" span="24">
            <a-image src="/src/assets/cat-food-admin-homepage.png" :width="300" :preview="false" />
        </a-col>
    </a-row>
</template>

<style></style>
