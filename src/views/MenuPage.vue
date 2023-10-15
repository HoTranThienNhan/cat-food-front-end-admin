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
const goToProductDetailsPage = (productId) => {
    router.push({ 
        name: "productpage", 
        params: { id: productId } 
    });
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
                    <ProductCard :product="product" @click="() => goToProductDetailsPage(product?._id)" />
                </a-col>
            </a-row>
        </a-col>
    </a-row>
</a-spin>


    <!-- </div> -->
</template>

<style></style>
