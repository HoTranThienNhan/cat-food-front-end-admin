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
const fetchDataByType = async (type) => {
    try {
        loading.value = true;
        products.value = await ProductService.getProductsByType(type);
        loading.value = false;
    } catch (error) {
        console.log(error);
    }
}
const getProductsByType = (type, e) => {
    e.target.parentNode.parentNode.childNodes.forEach(element => {
        if (element.classList) {
            element.classList.remove("type-filter-checked");
        }
    });
    e.target.parentNode.classList.add("type-filter-checked");
    if (type === 'all') {
        fetchData();
    } else {
        fetchDataByType(type);
    }
}

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
        <a-row justify="center" style="margin-bottom: 40px;">
            <a-col span="10" class="type-filter">
                <a-row justify="space-between" class="type-filter-row">
                    <a-col class="type-filter-checked">
                        <h5 style="cursor: pointer;" @click="(e) => getProductsByType('all', e)">Tất Cả</h5>
                    </a-col>
                    <a-col>
                        <h5 style="cursor: pointer;" @click="(e) => getProductsByType('dry', e)">Hạt Khô</h5>
                    </a-col>
                    <a-col>
                        <h5 style="cursor: pointer;" @click="(e) => getProductsByType('pate', e)">Pate</h5>
                    </a-col>
                    <a-col>
                        <h5 style="cursor: pointer;" @click="(e) => getProductsByType('gel', e)">Gel</h5>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
        <a-row justify="center">
            <a-col span="20">
                <a-row justify="space-evenly">
                    <a-col v-for="(product, index) in products" span="7" style="margin: 0px 30px 30px 0px">
                        <!-- <ProductCard :product="product" @click="() => goToProductDetailsPage(product?._id)" /> -->
                        <a-card hoverable style="width: 280px; height: 360px"
                            @click="() => goToProductDetailsPage(product?._id)">
                            <a-row justify="center">
                                <a-col style="margin: 20px 0px;">
                                    <a-image v-bind:src="`${product?.image}`" :width="180" :height="180" :preview="false"
                                        :previewMask="false" />
                                </a-col>
                            </a-row>
                            <a-row justify="center">
                                <a-col span="20" align="center">
                                    <h6
                                        style="margin-top: 15px; text-transform: uppercase; font-size: 18px; font-weight: 700;">
                                        {{ product?.name }}</h6>
                                </a-col>
                            </a-row>
                            <a-row justify="center">
                                <a-col span="20" align="center">
                                    <h6 style="margin-bottom: 30px; font-size: 18px;">{{
                                        product?.price?.toLocaleString() }} VNĐ</h6>
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

<style>
.type-filter .type-filter-checked {
    color: rgb(255, 61, 61);
}
</style>
