
<script setup>
import { reactive, toRefs } from 'vue';

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

// props
const props = defineProps({
    user: { type: Object, required: true }
});
const { user } = toRefs(props);

// emits
const emit = defineEmits(['submit:signin']);

// data
// const userSignInFormSchema = yup.object().shape({
//     email: yup
//         .string()
//         .required("E-mail không được để trống.")
//         .email("E-mail không đúng.")
//         .max(50, "E-mail tối đa 50 ký tự."),
//     password: yup
//         .string()
//         .required("Mật khẩu không được để trống."),
// });
const userLocal = reactive(user);


// methods
async function onSubmitFinishedSignIn() {
    emit("submit:signin", userLocal?._object?.user);
};
</script>


<template>
    <a-form :model="userLocal" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
        @finish="onSubmitFinishedSignIn">
        <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'E-mail không được để trống.' }]">
            <a-input v-model:value="userLocal.email" />
        </a-form-item>

        <a-form-item label="Mật Khẩu" name="password" :rules="[{ required: true, message: 'Mật khẩu không được để trống.' }]">
            <a-input-password v-model:value="userLocal.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Đăng Nhập</a-button>
        </a-form-item>
    </a-form>
</template>
