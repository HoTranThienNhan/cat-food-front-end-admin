
<script setup>
import { reactive, toRefs } from 'vue';
import { router } from '@/router';

// import * as yup from "yup";
// import { Form, Field, ErrorMessage } from "vee-validate";

// props
const props = defineProps({
    user: { type: Object, required: true }
});
const { user } = toRefs(props);

// emits
const emit = defineEmits(['submit:signin']);

// data
const userLocal = reactive(user);


// methods
async function onSubmitFinishedSignIn() {
    emit("submit:signin", userLocal?._object?.user);
};
const goToSignUpPage = () => {
    router.push({ name: "signuppage" });
}
</script>


<template>
    <a-form :model="userLocal" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        @finish="onSubmitFinishedSignIn">
        <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'E-mail không được để trống.' }]">
            <a-input v-model:value="userLocal.email" />
        </a-form-item>

        <a-form-item label="Mật Khẩu" name="password"
            :rules="[{ required: true, message: 'Mật khẩu không được để trống.' }]">
            <a-input-password v-model:value="userLocal.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
            <a-button type="primary" html-type="submit" style="width: 100%;">Đăng Nhập</a-button>
        </a-form-item>
    </a-form>
</template>
