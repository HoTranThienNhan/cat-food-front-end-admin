<script setup>
import { useAuthStore } from '@/stores/auth.store';
const authStore = useAuthStore();
const user = authStore?.user;

</script>

<template>
    <div>MENUPAGE</div>
        <div class="row">
            <div class="col-2">
                <div>Phân Loại</div>
            </div>
            <div class="col-10 row d-flex justify-content-between">
                <!-- Card -->
                <div class="col-4 mb-3">
                    <div class="border rounded p-3">
                        <img src="@/assets/cat-food.png" width="100%" />
                        <div class="text-center mt-3">
                            <h5>Tên Sản Phẩm</h5>
                            <h5>50.000 VNĐ</h5>
                        </div>
                    </div>
                </div>
                <div class="col-4 mb-3">
                    <div class="border rounded p-3">
                        <img src="@/assets/cat-food.png" width="100%" />
                        <div class="text-center mt-3">
                            <h5>Tên Sản Phẩm</h5>
                            <h5>50.000 VNĐ</h5>
                        </div>
                    </div>
                </div>
                <div class="col-4 mb-3">
                    <div class="border rounded p-3">
                        <img src="@/assets/cat-food.png" width="100%" />
                        <div class="text-center mt-3">
                            <h5>Tên Sản Phẩm</h5>
                            <h5>50.000 VNĐ</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<style></style>
