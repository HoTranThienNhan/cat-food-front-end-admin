<script setup>
import { useAuthStore } from '@/stores/auth.store';
import ProductService from "@/services/product.service";
import { ref, onMounted } from 'vue';
import { router } from '@/router';
import ProductCard from "@/components/ProductCard.vue";

const authStore = useAuthStore();
const user = authStore?.user;

// props
const products = ref([]);
const loading = ref(false);

// methods
const fetchData = async () => {
    try {
        loading.value = true;
        products.value = await ProductService.getAllProducts();
        loading.value = false;
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    fetchData();
});

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
            <span>Menu</span>
        </a-breadcrumb-item>
    </a-breadcrumb>

    <a-spin :spinning="loading">
    <a-row>
        <a-col span="5">

        </a-col>
        <a-col span="19">
            <a-row justify="space-evenly">
                <a-col v-for="(product, index) in products" span="7" style="margin: 0px 30px 30px 0px">
                    <!-- <a-card hoverable style="width: 280px; height: 340px">
                        <a-row justify="center">
                            <a-col>
                                <a-image src="/src/assets/cat-food.png" :width="200" :preview="false"
                                    :previewMask="false" />
                            </a-col>
                        </a-row>
                        <a-row justify="center">
                            <a-col span="14" align="center">
                                <h6 style="margin-top: 15px">{{ product?.name }}</h6>
                            </a-col>
                        </a-row>
                        <a-row justify="center">
                            <a-col span="14" align="center">
                                <h6 style="margin-bottom: 30px">{{ product?.price?.toLocaleString() }} VNĐ</h6>
                            </a-col>
                        </a-row>
                    </a-card> -->
                    <ProductCard :product="product" />
                </a-col>
            </a-row>
        </a-col>
    </a-row>
</a-spin>


    <!-- </div> -->
</template>

<style></style>
