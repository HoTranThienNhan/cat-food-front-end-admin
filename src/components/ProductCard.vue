
<script setup>
import { ref, reactive, computed, toRefs } from 'vue';

// props
const props = defineProps({
    product: []
});
const { product } = toRefs(props);


// data
const productLocal = product?._object?.product;

</script>

<template>
    <a-card hoverable style="width: 280px; height: 340px">
        <a-row justify="center">
            <a-col>
                <a-image src="/src/assets/cat-food.png" :width="200" :preview="false" :previewMask="false" />
            </a-col>
        </a-row>
        <a-row justify="center">
            <a-col span="14" align="center">
                <h6 style="margin-top: 15px">{{ productLocal?.name }}</h6>
            </a-col>
        </a-row>
        <a-row justify="center">
            <a-col span="14" align="center">
                <h6 style="margin-bottom: 30px">{{ productLocal?.price?.toLocaleString() }} VNĐ</h6>
            </a-col>
        </a-row>
    </a-card>
</template>
