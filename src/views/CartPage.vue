<script setup>
import { useAuthStore } from '@/stores/auth.store';
import { useCartStore } from '@/stores/cart.store';
import CartService from "@/services/cart.service";
import InputNumber from "@/components/InputNumber.vue";
import { ref, toRefs, onMounted, reactive, computed, watch } from 'vue';
import { router } from '@/router';
import { useRoute } from 'vue-router';
import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const route = useRoute();

const authStore = useAuthStore();
const user = authStore?.user;

// props
// let cart = ref(null);
let cart = ref(null);
let cartStore = useCartStore();
const loading = ref(false);
// const { id: productId } = route?.params;

// methods
const getCart = async (userId) => {
    try {
        // cart.value = await CartService.getCart(userId);
        cart.value = cartStore.getCart();
        console.log(cart);
    } catch (error) {
        console.log(error);
        // router.push({
        //     name: "notfoundpage",
        //     params: {
        //         pathMatch: route.path.split("/").slice(1)
        //     },
        //     query: route.query,
        //     hash: route.hash,
        // });
    }
}
onMounted(() => {
    getCart(user?.email);
});


const getThis = () => {

}

const removeProduct = (productId) => {
    const cartStore = useCartStore();
    cartStore.removeProduct(productId);
    message.success('Xóa sản phẩm thành công', 3);
}


// watch cart state to update cart
watch(
    [cartStore],
    () => {
        cart.value = cartStore?.cart;
    },
    { deep: true }
);


// navigate
const goToHomePage = () => {
    router.push({ name: "homepage" });
}
const goToMenuPage = () => {
    router.push({ name: "menupage" });
}
</script>





<template>
    {{ cart?.products }}
    <a-breadcrumb style="margin-bottom: 20px;">
        <a-breadcrumb-item>
            <span role="button" @click="goToHomePage">Trang Chủ</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <span>Giỏ Hàng</span>
        </a-breadcrumb-item>
    </a-breadcrumb>

    <a-spin :spinning="loading">
        <a-row justify="center" style="margin-bottom: 20px;">
            <a-col>
                <div style="font-weight: bold; font-size: 28px;">GIỎ HÀNG CỦA TÔI ({{ cart?.products?.length - 1 > 0 ?
                    cart?.products?.length - 1 : 0 }})</div>
            </a-col>
        </a-row>
        <a-row>
            <a-col span="16">
                <a-divider></a-divider>

                <div v-for="(product, index) in cart?.products">
                    <a-row v-if="index > 0" justify="space-evenly" align="middle">
                        <a-col span="4">
                            <a-image src="/src/assets/cat-food.png" :width="110" :preview="false" />
                        </a-col>
                        <a-col span="8" :offset="1">
                            <a-row justify="center">
                                <a-col span="24">
                                    <h5 style="">{{ product?.name }}</h5>
                                </a-col>
                                <a-col span="24">
                                    <a-tag color="orange" style="font-size: 16px">{{ product?.type }}</a-tag>
                                </a-col>
                            </a-row>
                        </a-col>
                        <a-col span="3">
                            <!-- <a-input-number :name="product?.name" v-model:value="amountValue" size="large" :min="1" :max="10" style="width: 100%" /> -->
                            <InputNumber :value="product?.amount" />
                            {{ product?.amount }}
                            <button @click="getThis">Click</button>
                        </a-col>
                        <a-col span="3" :offset="2" align="middle">
                            <h6 style="margin-top: 6px">{{ product?.price?.toLocaleString() }} VNĐ</h6>
                        </a-col>
                        <a-col span="3" align="middle">
                            <a-popconfirm title="Bạn chắc chắn xóa sản phẩm này？" @confirm="() => removeProduct(product?._id)">
                                <template #icon><question-circle-outlined style="color: red" /></template>
                                <CloseOutlined />
                            </a-popconfirm>
                        </a-col>
                        <a-divider></a-divider>
                    </a-row>
                </div>



                <!-- <a-row justify="space-evenly" align="middle">
                    <a-col span="4">
                        <a-image src="/src/assets/cat-food.png" :width="110" :preview="false" />
                    </a-col>
                    <a-col span="8" :offset="1">
                        <a-row justify="center">
                            <a-col span="24">
                                <h5 style="">TÊN SẢN PHẨM</h5>
                            </a-col>
                            <a-col span="24">
                                <a-tag color="orange" style="font-size: 16px">Pate</a-tag>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col span="3">
                        <a-input-number v-model:value="amountValue" size="large" :min="1" :max="10"
                                    style="width: 100%" />
                    </a-col>
                    <a-col span="3" :offset="2" align="middle">
                        <h6 style="margin-top: 6px">23.000 VNĐ</h6>
                    </a-col>
                    <a-col span="3" align="middle">
                                <CloseOutlined />
                    </a-col>
                </a-row>
                <a-divider></a-divider> -->
            </a-col>

            <a-col span="8" align="center" style="padding: 0px 25px 30px 0px">
                <!-- <a-image src="/src/assets/cat-food.png" :width="330" /> -->
            </a-col>
        </a-row>
    </a-spin>
</template>

<style></style>
