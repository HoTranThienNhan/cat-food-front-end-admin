<script setup>
import { ref, toRefs, watch } from 'vue';

const input = defineProps(
    ['value']
);

let amountValue = ref(input?.value);

watch(input, () => {
    amountValue = ref(input?.value);
})

</script>

<template>
    <a-input v-model:value="amountValue" style="width: 100%; text-align: center; font-size: 16px; user-select: none; cursor: context-menu;"
        size="large" readonly />
</template>