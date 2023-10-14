
<script setup>
import { ref, reactive, computed, toRefs } from 'vue';

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
const userSignInFormSchema = yup.object().shape({
    email: yup
        .string()
        .required("E-mail không được để trống.")
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
    password: yup
        .string()
        .required("Mật khẩu không được để trống."),
});
const userLocal = reactive(user);

// methods
async function submitSignIn() {
    emit("submit:signin", userLocal?._object?.user);
};
</script>


<template>
    <Form @submit="submitSignIn" :validation-schema="userSignInFormSchema">
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="userLocal.email" />
            <ErrorMessage name="email" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="userLocal.password" />
            <ErrorMessage name="password" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Đăng Nhập</button>
        </div>
    </Form>
</template>


<!-- <script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        user: { type: Object, required: true }
    },
    emits: ["submit:signin"],
    data() {
        const userSignInFormSchema = yup.object().shape({
            email: yup
                .string()
                .required("E-mail không được để trống.")
                .email("E-mail không đúng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            password: yup
                .string()
                .required("Mật khẩu không được để trống."),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // userLocal để liên kết với các input trên form
            userLocal: this.user,
            userSignInFormSchema,
        };
    },
    methods: {
        submitSignIn() {
            this.$emit("submit:signin", this.userLocal);
        },
    },
}
</script> -->