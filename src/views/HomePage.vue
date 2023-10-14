<script setup>

import { useAuthStore } from '@/stores/auth.store';
const authStore = useAuthStore();
const user = authStore?.user;

</script>

<template>
    <div>HOMEPAGE</div>
</template>

<style></style>
