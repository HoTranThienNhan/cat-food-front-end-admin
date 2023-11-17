<script setup>
import { router } from '@/router';
import UserService from "@/services/user.service";
import { ref, onMounted, reactive } from 'vue';
import { getBase64 } from '@/utils';
import { FormOutlined, DownOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useAuthStore } from '@/stores/auth.store';
import { useRoute } from 'vue-router';

const route = useRoute();

const authStore = useAuthStore();
let user = ref(authStore?.user);

if (user?.value && user?.value?.role !== "General Manager" && user?.value?.role !== "User Manager") {
    router.push({
        name: "notfoundpage",
        params: {
            pathMatch: route.path.split("/").slice(1)
        },
        query: route.query,
        hash: route.hash,
    });
}

let allUsers = [];
let columns = [];
const addedUser = reactive({
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    role: 'Customer',
});

const data = ref([]);
const fetchAllUsers = async () => {
    allUsers = await UserService.getAllUsers();
    // get all products data
    data.value = allUsers?.map((user, index) => {
        return {
            ...user,
            key: user._id
        }
    });
    // columns table
    columns = [
        {
            title: 'Mã Người Dùng',
            dataIndex: '_id',
            sorter: (a, b) => a._id.localeCompare(b._id),
        },
        {
            title: 'Họ Tên',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Địa Chỉ',
            dataIndex: 'address',
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phone',
        },
        {
            title: 'Vai Trò',
            dataIndex: 'role',
        },
        {
            title: 'Cập Nhật',
            dataIndex: 'edit',
        },
    ];
}
onMounted(() => {
    fetchAllUsers();
});


const openModalAddUser = ref(false);
const onChange = (pagination, filters, sorter) => {
};
const handleAddNewUser = async () => {
    await UserService.signup(addedUser);
    message.success("Thêm người dùng thành công", 3);
    openModalAddUser.value = false;
    fetchAllUsers();
    addedUser.name = '';
    addedUser.email = '';
    addedUser.address = '';
    addedUser.phone = '';
    addedUser.password = '';
    addedUser.role = '';
}
const handleAddMenuRole = (value) => {
    addedUser.role = value.key;
}




// -------
const openModalUpdateUser = ref(false);
const updatedUser = reactive({
    id: '',
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    role: '',
    active: true,
});
const handleEditUser = async (key) => {
    openModalUpdateUser.value = true;

    const thisUser = await UserService.getUserDetails(key);
    updatedUser.id = thisUser._id;
    updatedUser.name = thisUser.name;
    updatedUser.email = thisUser.email;
    updatedUser.address = thisUser.address;
    updatedUser.phone = thisUser.phone;
    updatedUser.password = thisUser.password;
    updatedUser.role = thisUser.role;
    updatedUser.active = thisUser.active;
}

const handleUpdateUser = async () => {
    await UserService.updateUser(updatedUser.id, updatedUser);

    message.success("Cập nhật người dùng thành công", 3);
    openModalUpdateUser.value = false;

    fetchAllUsers();
}
const handleUpdateMenuRole = (value) => {
    updatedUser.role = value.key;
}


// navigate
const showModalAddUser = () => {
    openModalAddUser.value = true;
}
</script>

<template>
    <a-row style="margin: 100px 50px 0px 50px;">
        <a-col span="24">
            <a-row justify="center">
                <a-col style="margin-bottom: 20px;">
                    <h4>QUẢN LÝ NGƯỜI DÙNG</h4>
                </a-col>
            </a-row>
        </a-col>
        <a-col span="24">
            <a-button type="primary" @click="showModalAddUser">Thêm Người Dùng</a-button>
        </a-col>
        <a-col span="24" style="margin-top: 20px">
            <a-table bordered :columns="columns" :data-source="data" @change="onChange">
                <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex === 'edit'">
                        <FormOutlined style="font-size: 20px;" @click="() => handleEditUser(record.key)" />
                    </template>
                </template>
            </a-table>
        </a-col>
    </a-row>
    <a-row>
        <a-col style="margin-bottom: 20px;">
            <a-modal v-model:open="openModalAddUser" title="Thêm Người Dùng" @ok="handleAddNewUser">
                <a-form :model="addedUser" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 20 }"
                    autocomplete="off">
                    <a-form-item label="Tên Người Dùng" name="name"
                        :rules="[{ required: true, message: 'Tên người dùng không được để trống.' }]">
                        <a-input v-model:value="addedUser.name" />
                    </a-form-item>

                    <a-form-item label="Email" name="email"
                        :rules="[{ required: true, message: 'Email không được để trống.' }]">
                        <a-input v-model:value="addedUser.email" />
                    </a-form-item>

                    <a-form-item label="Số Điện Thoại" name="phone"
                        :rules="[{ required: true, message: 'Số điện thoại không được để trống.' }]">
                        <a-input v-model:value="addedUser.phone" />
                    </a-form-item>

                    <a-form-item label="Địa Chỉ" name="address"
                        :rules="[{ required: true, message: 'Địa chỉ không được để trống.' }]">
                        <a-input v-model:value="addedUser.address" />
                    </a-form-item>

                    <a-form-item label="Mật Khẩu" name="password"
                        :rules="[{ required: true, message: 'Mật khẩu không được để trống.' }]">
                        <a-input-password v-model:value="addedUser.password" />
                    </a-form-item>

                    <a-row style="margin-bottom: 30px;">
                        <a-col span="3" :offset="5">
                            <span className="required-input-symbol">Vai Trò:</span>
                        </a-col>
                        <a-col span="16">
                            <a-dropdown>
                                <template #overlay>
                                    <a-menu @click="handleAddMenuRole">
                                        <a-menu-item key="Customer">
                                            Customer
                                        </a-menu-item>
                                        <a-menu-item key="General Manager">
                                            General Manager
                                        </a-menu-item>
                                        <a-menu-item key="Product Manager">
                                            Product Manager
                                        </a-menu-item>
                                        <a-menu-item key="User Manager">
                                            User Manager
                                        </a-menu-item>
                                        <a-menu-item key="Order Manager">
                                            Order Manager
                                        </a-menu-item>
                                    </a-menu>
                                </template>
                                <a-button style="width: 100%; text-align: start;">
                                    <a-row justify='space-between'>
                                        <a-col>
                                            {{ addedUser.role }}
                                        </a-col>
                                        <a-col>
                                            <DownOutlined />
                                        </a-col>
                                    </a-row>
                                </a-button>
                            </a-dropdown>
                        </a-col>
                    </a-row>

                </a-form>
            </a-modal>

        </a-col>
    </a-row>

    <a-modal v-model:open="openModalUpdateUser" title="Cập Nhật Người Dùng" @ok="handleUpdateUser">
        <a-form :model="updatedUser" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 20 }" autocomplete="off">
            <a-form-item label="Tên Người Dùng" name="name"
                :rules="[{ required: true, message: 'Tên người dùng không được để trống.' }]">
                <a-input v-model:value="updatedUser.name" />
            </a-form-item>

            <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'Email không được để trống.' }]">
                <a-input v-model:value="updatedUser.email" />
            </a-form-item>

            <a-form-item label="Số Điện Thoại" name="phone"
                :rules="[{ required: true, message: 'Số điện thoại không được để trống.' }]">
                <a-input v-model:value="updatedUser.phone" />
            </a-form-item>

            <a-form-item label="Địa Chỉ" name="address"
                :rules="[{ required: true, message: 'Địa chỉ không được để trống.' }]">
                <a-input v-model:value="updatedUser.address" />
            </a-form-item>

            <a-row style="margin-bottom: 30px;">
                <a-col span="3" :offset="5">
                    <span className="required-input-symbol">Vai Trò:</span>
                </a-col>
                <a-col span="16">
                    <a-dropdown :disabled="user?._id === updatedUser.id">
                        <template #overlay>
                            <a-menu @click="handleUpdateMenuRole">
                                <a-menu-item key="Customer">
                                    Customer
                                </a-menu-item>
                                <a-menu-item key="General Manager">
                                    General Manager
                                </a-menu-item>
                                <a-menu-item key="Product Manager">
                                    Product Manager
                                </a-menu-item>
                                <a-menu-item key="User Manager">
                                    User Manager
                                </a-menu-item>
                                <a-menu-item key="Order Manager">
                                    Order Manager
                                </a-menu-item>
                            </a-menu>
                        </template>
                        <a-button style="width: 100%; text-align: start;">
                            <a-row justify='space-between'>
                                <a-col>
                                    {{ updatedUser.role }}
                                </a-col>
                                <a-col>
                                    <DownOutlined />
                                </a-col>
                            </a-row>
                        </a-button>
                    </a-dropdown>
                </a-col>
            </a-row>

            <a-row style="margin-bottom: 30px;">
                <a-col span="5" :offset="3">
                    <span className="required-input-symbol">Hoạt Động:</span>
                </a-col>
                <a-col span="16">
                    <a-checkbox v-model:checked="updatedUser.active" :disabled="user?._id === updatedUser.id"></a-checkbox>
                </a-col>
            </a-row>

        </a-form>
    </a-modal>
</template>

<style scoped>
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}

.required-input-symbol::before {
    display: inline-block;
    margin-inline-end: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: "*";
}
</style>