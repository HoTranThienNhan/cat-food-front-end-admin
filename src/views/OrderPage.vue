<script setup>
import { useAuthStore } from '@/stores/auth.store';
import OrderService from "@/services/order.service";
import { ref, onMounted } from 'vue';
import { router } from '@/router';
import ProductCard from "@/components/ProductCard.vue";

const authStore = useAuthStore();
const user = authStore?.user;

// props
const orders = ref([]);
const loading = ref(false);

// methods
const fetchData = async () => {
    try {
        // loading.value = true;
        orders.value = await OrderService.getOrder(user?._id);
        // loading.value = false;
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    fetchData();
});


const cancelOrder = async (orderId) => {
    await OrderService.updateOrderStatus(orderId, "Đã Hủy");
    fetchData();
}

// navigate
const goToHomePage = () => {
    router.push({ name: "homepage" });
}

</script>

<template>
    <a-breadcrumb style="margin-bottom: 40px;">
        <a-breadcrumb-item>
            <span role="button" @click="goToHomePage">Trang Chủ</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <span>Đơn Hàng Của Tôi</span>
        </a-breadcrumb-item>
    </a-breadcrumb>

    <a-spin :spinning="loading">
        <a-row>
            <a-col span="24">
                <a-row justify="space-evenly">
                    <!-- <a-col v-for="(product, index) in products" span="7" style="margin: 0px 30px 30px 0px">
                    <ProductCard :product="product" @click="() => goToProductDetailsPage(product?._id)" />
                </a-col> -->
                    <a-col span="24" v-for="(order, index) in orders" style="margin-bottom: 30px;">
                        <a-card hoverable
                            style="height: 340px; padding: 0px 25px; border-radius: 20px; background-color: #f7f7f7;">
                            <a-row justify="left">
                                <a-col>
                                    <h4>Đơn Hàng</h4>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col span="8">
                                    <div style="font-size: 16px; margin-bottom: 10px;">
                                        Tổng Tiền: <span style="font-weight: 500;">{{ order?.totalPrice?.toLocaleString() }}
                                            VNĐ</span>
                                    </div>
                                    <div style="font-size: 16px; margin-bottom: 10px;">
                                        Phương Thức Thanh Toán: <span style="font-weight: 500;">{{ order?.method }}</span>
                                    </div>
                                    <div style="font-size: 16px; margin-bottom: 10px;">
                                        Phí Vận Chuyển: <span style="font-weight: 500;">{{
                                            order?.deliveryFee?.toLocaleString() }} VNĐ</span>
                                    </div>
                                    <div style="font-size: 16px; margin-bottom: 10px;">
                                        Nơi Nhận: <span style="font-weight: 500;">{{ order?.address }}</span>
                                    </div>
                                    <div style="font-size: 16px; margin-bottom: 10px;">
                                        Số Điện Thoại: <span style="font-weight: 500;">{{ order?.phone }}</span>
                                    </div>
                                    <div style="font-size: 16px; margin-bottom: 15px;">
                                        Tình Trạng: <span style="font-weight: 500;">{{ order?.status }}</span>
                                    </div>
                                    <div>
                                        <a-popconfirm
                                            v-if="order?.status === 'Chờ Xác Nhận' || order?.status === 'Chờ Lấy Hàng'"
                                            title="Bạn có muốn hủy đơn hàng này？"
                                            @confirm="() => cancelOrder(order?._id)">
                                            <a-button
                                                v-if="order?.status === 'Chờ Xác Nhận' || order?.status === 'Chờ Lấy Hàng'"
                                                type="primary" danger>
                                                Hủy Đơn Hàng
                                            </a-button>
                                        </a-popconfirm>
                                    </div>
                                </a-col>
                                <a-col span="16" style="height: 230px; overflow: auto;">
                                    <a-row v-for="(product, productIndex) in order?.products" align="middle">
                                        <a-col span="6">
                                            <a-image v-bind:src="`${product?.image}`" :width="110" :preview="false"
                                                :previewMask="false" />
                                        </a-col>
                                        <a-col span="7">
                                            <div>
                                                <h5>{{ product?.name }}</h5>
                                            </div>
                                            <div style="font-size: 16px; margin-bottom: 10px;">
                                                Loại: <span style="font-weight: 500;">{{ product?.type }}</span>
                                            </div>
                                        </a-col>
                                        <a-col span="5">
                                            <div style="font-size: 16px; margin-bottom: 10px;">
                                                Số Lượng: <span style="font-weight: 500;">x{{ product?.amount }}</span>
                                            </div>
                                        </a-col>
                                        <a-col span="6">
                                            <div style="font-size: 16px; margin-bottom: 10px;">
                                                Giá: <span style="font-weight: 500;">{{ product?.price?.toLocaleString() }}
                                                    VNĐ</span>
                                            </div>
                                        </a-col>
                                    </a-row>
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </a-spin>


    <!-- </div> -->
</template>

<style></style>
