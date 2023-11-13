<script setup>

import { useAuthStore } from '@/stores/auth.store';
import { router } from '@/router';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const user = authStore?.user;

onMounted(() => {
    router.push({ name: "signinpage" });
});

</script>

<template>
    <div>HOMEPAGE</div>
</template>

<style></style>
