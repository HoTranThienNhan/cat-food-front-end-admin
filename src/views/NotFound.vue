<script setup>
import { router } from '@/router';

const goToBackPage = () => {
    router.push({ name: "signinpage" });
}

</script>

<template>
    <div class="page">
        <p style="margin-top: 150px;">
            Oops, không thể tìm thấy trang. 
            <span style="cursor: pointer; color: rgb(102, 182, 235)" @click="goToBackPage">Quay Lại.</span>
        </p>
    </div>
</template>