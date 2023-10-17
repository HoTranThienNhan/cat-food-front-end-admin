<script setup>
import { ref, toRefs } from 'vue';

const input = defineProps(
    ['value']
);
const amountValue = ref(input?.value);

// emits
const emit = defineEmits(['input:number']);

emit("input:number", amountValue);

</script>

<template>
    <!-- <a-input-number :name="product?.name" v-model:value="amountValue" size="large" :min="1" :max="10" style="width: 100%" /> -->
    <a-input-number v-model:value="amountValue" size="large" :min="1" :max="10" style="width: 100%" />
</template>