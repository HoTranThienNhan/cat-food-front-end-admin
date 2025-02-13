<script setup>
import { router } from '@/router';
import ProductService from "@/services/product.service";
import { ref, onMounted, reactive } from 'vue';
import { getBase64 } from '@/utils';
import { FormOutlined, DeleteOutlined, DownOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useAuthStore } from '@/stores/auth.store';
import { useRoute } from 'vue-router';

const route = useRoute();

const authStore = useAuthStore();
let user = ref(authStore?.user);

if (user?.value && user?.value?.role !== "General Manager" && user?.value?.role !== "Product Manager") {
    router.push({
        name: "notfoundpage",
        params: {
            pathMatch: route.path.split("/").slice(1)
        },
        query: route.query,
        hash: route.hash,
    });
}

let allProducts = [];
let columns = [];
const addedProduct = reactive({
    name: '',
    type: 'dry',
    price: '',
    quantity: '',
    description: '',
    image: '',
});

const data = ref([]);
const fetchAllProducts = async () => {
    allProducts = await ProductService.getAllProducts();
    // get all products data
    data.value = allProducts?.map((product, index) => {
        return {
            ...product,
            key: product._id
        }
    });
    // columns table
    columns = [
        {
            title: 'Mã SP',
            dataIndex: '_id',
            sorter: (a, b) => a._id.localeCompare(b._id),
        },
        {
            title: 'Tên SP',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Loại SP',
            dataIndex: 'type',
            filters: [
                {
                    text: 'dry',
                    value: 'dry',
                },
                {
                    text: 'pate',
                    value: 'pate',
                },
                {
                    text: 'gel',
                    value: 'gel',
                },
            ],
            filterMultiple: false,
            onFilter: (value, record) => record.type.indexOf(value) === 0,
        },
        {
            title: 'Giá SP',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Số Lượng Tồn Kho',
            dataIndex: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity
        },
        {
            title: 'Đã Bán',
            dataIndex: 'sold',
            sorter: (a, b) => a.sold - b.sold,
        },
        {
            title: 'Cập Nhật',
            dataIndex: 'edit',
        },
        {
            title: 'Xóa',
            dataIndex: 'delete',
        },
    ];
}
onMounted(() => {
    fetchAllProducts();
});


// image upload
const previewImageVisible = ref(false);
const previewImage = ref('');
const previewImageTitle = ref('');
const fileImageList = ref([]);

const handlePreviewImageCancel = () => {
    previewImageVisible.value = false;
    previewImageTitle.value = '';
};
const handlePreview = async file => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    previewImage.value = file.url || file.preview;
    previewImageVisible.value = true;
    previewImageTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};
const uploadImageProduct = async (imageFile) => {
    const file = imageFile?.file;
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        addedProduct.image = file.preview;
    }

    if (fileImageList.value.length === 0) {
        addedProduct.image = '';
    }
}


const openModalAddProduct = ref(false);
const onChange = (pagination, filters, sorter) => {
};
const handleAddNewProduct = async () => {
    await ProductService.createProduct(addedProduct);

    message.success("Tạo sản phẩm thành công", 3);
    openModalAddProduct.value = false;

    fetchAllProducts();

    addedProduct.name = '';
    addedProduct.type = '';
    addedProduct.price = 'dry';
    addedProduct.quantity = '';
    addedProduct.description = '';
    addedProduct.image = '';
    fileImageList.value = [];
    previewImage.value = '';
}
const handleCreateMenuType = (value) => {
    addedProduct.type = value.key;
}


// -------
const openModalUpdateProduct = ref(false);
const updatedProduct = reactive({
    id: '',
    name: '',
    type: 'dry',
    price: '',
    quantity: '',
    description: '',
    image: '',
});
const oldUpdatedImage = ref('');
const handleEditProduct = async (key) => {
    openModalUpdateProduct.value = true;

    const thisProduct = await ProductService.getProductDetails(key);
    updatedProduct.id = thisProduct._id;
    updatedProduct.name = thisProduct.name;
    updatedProduct.type = thisProduct.type;
    updatedProduct.price = thisProduct.price;
    updatedProduct.quantity = thisProduct.quantity;
    updatedProduct.description = thisProduct.description;
    updatedProduct.image = thisProduct.image;
    oldUpdatedImage.value = thisProduct.image;
}
const handleUpdateMenuType = (value) => {
    updatedProduct.type = value.key;
}

const fileUpdatedImageList = ref([]);
const previewUpdatedImageVisible = ref(false);
const previewUpdatedImage = ref('');
const previewUpdatedImageTitle = ref('');

const handlePreviewUpdatedImageCancel = () => {
    previewUpdatedImageVisible.value = false;
    previewUpdatedImageTitle.value = '';
};
const handleUpdatedImagePreview = async file => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    previewUpdatedImage.value = file.url || file.preview;
    previewUpdatedImageVisible.value = true;
    previewUpdatedImageTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};
const uploadImageUpdatedProduct = async (imageFile) => {
    const file = imageFile?.file;
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        updatedProduct.image = file.preview;
    }
    if (fileUpdatedImageList.value.length === 0) {
        updatedProduct.image = '';
    }
}


const handleUpdateProduct = async () => {
    await ProductService.updateProduct(updatedProduct.id, updatedProduct);

    message.success("Cập nhật sản phẩm thành công", 3);
    openModalUpdateProduct.value = false;

    fetchAllProducts();
    fileUpdatedImageList.value = [];
}

const handleDeleteProduct = async (key) => {
    try {
        await ProductService.deleteProduct(key);

        fetchAllProducts();
        message.success("Xóa sản phẩm thành công", 3);
    } catch (e) {
        message.error("Xóa sản phẩm không thành công", 3);
        console.log(e);
    }
}




// navigate
const goToHomePage = () => {
    router.push({ name: "homepage" });
}
const showModalAddProduct = () => {
    openModalAddProduct.value = true;
}
</script>

<template>
    <a-row style="margin: 100px 50px 0px 50px;">
        <a-col span="24">
            <a-row justify="center">
                <a-col style="margin-bottom: 20px;">
                    <h4>QUẢN LÝ SẢN PHẨM</h4>
                </a-col>
            </a-row>
        </a-col>
        <a-col span="24">
            <a-button type="primary" @click="showModalAddProduct">Thêm Sản Phẩm</a-button>
        </a-col>
        <a-col span="24" style="margin-top: 20px">
            <a-table bordered :columns="columns" :data-source="data" @change="onChange">
                <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex === 'edit'">
                        <FormOutlined style="font-size: 20px;" @click="() => handleEditProduct(record.key)" />
                    </template>
                    <template v-if="column.dataIndex === 'delete'">
                        <a-popconfirm title="Bạn có thực sự muốn hủy sản phẩm này?"
                            @confirm="() => handleDeleteProduct(record.key)">
                            <DeleteOutlined style="font-size: 20px;" />
                        </a-popconfirm>
                    </template>
                </template>
            </a-table>
        </a-col>
    </a-row>
    <a-row>
        <a-col style="margin-bottom: 20px;">
            <a-modal v-model:open="openModalAddProduct" title="Thêm Sản Phẩm" @ok="handleAddNewProduct">
                <a-form :model="addedProduct" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 20 }"
                    autocomplete="off">
                    <a-form-item label="Tên Sản Phẩm" name="name"
                        :rules="[{ required: true, message: 'Tên sản phẩm không được để trống.' }]">
                        <a-input v-model:value="addedProduct.name" />
                    </a-form-item>

                    <a-row style="margin-bottom: 30px;">
                        <a-col span="6" :offset="2">
                            <span className="required-input-symbol">Loại Sản Phẩm:</span>
                        </a-col>
                        <a-col span="16">
                            <a-dropdown>
                                <template #overlay>
                                    <a-menu @click="handleCreateMenuType">
                                        <a-menu-item key="dry">
                                            Dry Food
                                        </a-menu-item>
                                        <a-menu-item key="gel">
                                            Gel
                                        </a-menu-item>
                                        <a-menu-item key="pate">
                                            Pate
                                        </a-menu-item>
                                    </a-menu>
                                </template>
                                <a-button style="width: 100%; text-align: start;">
                                    <a-row justify='space-between'>
                                        <a-col>
                                            {{ addedProduct.type }}
                                        </a-col>
                                        <a-col>
                                            <DownOutlined />
                                        </a-col>
                                    </a-row>
                                </a-button>
                            </a-dropdown>
                        </a-col>
                    </a-row>
                    
                    <a-form-item label="Giá Sản Phẩm" name="price"
                        :rules="[{ required: true, message: 'Giá sản phẩm không được để trống.' }]">
                        <a-input-number v-model:value="addedProduct.price" style="width: 100%;" step="1000"
                            class="add-product-price-input" min="0" />
                    </a-form-item>

                    <a-form-item label="Số Lượng Tồn Kho" name="quantity"
                        :rules="[{ required: true, message: 'Số lượng tồn kho không được để trống.' }]">
                        <a-input-number v-model:value="addedProduct.quantity" style="width: 100%;" min="0" />
                    </a-form-item>

                    <a-form-item label="Mô Tả Sản Phẩm" name="description"
                        :rules="[{ required: true, message: 'Mô tả không được để trống.' }]">
                        <a-textarea v-model:value="addedProduct.description" :rows="3" />
                    </a-form-item>

                    <div style="margin-bottom: 10px;">
                        Ảnh Sản Phẩm
                    </div>
                    <div class="clearfix">
                        <a-upload @change="uploadImageProduct" list-type="picture-card" @preview="handlePreview"
                            :maxCount="1" v-model:file-list="fileImageList">
                            <div v-if="fileImageList.length < 1">
                                <plus-outlined />
                                <div style="margin-top: 8px">Upload</div>
                            </div>
                        </a-upload>
                        <a-modal :open="previewImageVisible" :title="previewImageTitle" :footer="null"
                            @cancel="handlePreviewImageCancel">
                            <img alt="image-product" style="width: 100%" :src="previewImage" />
                        </a-modal>
                    </div>
                </a-form>
            </a-modal>

        </a-col>
    </a-row>

    <a-modal v-model:open="openModalUpdateProduct" title="Cập Nhật Sản Phẩm" @ok="handleUpdateProduct">
        <a-form :model="updatedProduct" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 20 }"
            autocomplete="off">
            <a-form-item label="Tên Sản Phẩm" name="name"
                :rules="[{ required: true, message: 'Tên sản phẩm không được để trống.' }]">
                <a-input v-model:value="updatedProduct.name" />
            </a-form-item>

            <a-row style="margin-bottom: 30px;">
                <a-col span="6" :offset="2">
                    <span className="required-input-symbol">Loại Sản Phẩm:</span>
                </a-col>
                <a-col span="16">
                    <a-dropdown>
                        <template #overlay>
                            <a-menu @click="handleUpdateMenuType">
                                <a-menu-item key="dry">
                                    Dry Food
                                </a-menu-item>
                                <a-menu-item key="gel">
                                    Gel
                                </a-menu-item>
                                <a-menu-item key="pate">
                                    Pate
                                </a-menu-item>
                            </a-menu>
                        </template>
                        <a-button style="width: 100%; text-align: start;">
                            <a-row justify='space-between'>
                                <a-col>
                                    {{ updatedProduct.type }}
                                </a-col>
                                <a-col>
                                    <DownOutlined />
                                </a-col>
                            </a-row>
                        </a-button>
                    </a-dropdown>
                </a-col>
            </a-row>

            <a-form-item label="Giá Sản Phẩm" name="price"
                :rules="[{ required: true, message: 'Giá sản phẩm không được để trống.' }]">
                <a-input-number v-model:value="updatedProduct.price" style="width: 100%;" step="1000"
                    class="add-product-price-input" min="0" />
            </a-form-item>

            <a-form-item label="Số Lượng Tồn Kho" name="quantity"
                :rules="[{ required: true, message: 'Số lượng tồn kho không được để trống.' }]">
                <a-input-number v-model:value="updatedProduct.quantity" style="width: 100%;" min="0" />
            </a-form-item>

            <a-form-item label="Mô Tả Sản Phẩm" name="description"
                :rules="[{ required: true, message: 'Mô tả không được để trống.' }]">
                <a-textarea v-model:value="updatedProduct.description" :rows="3" />
            </a-form-item>

            <div style="margin-bottom: 10px;">
                Ảnh Sản Phẩm
            </div>
            <div class="clearfix">
                <a-row>
                    <a-col v-if="updatedProduct.image && updatedProduct.image === oldUpdatedImage"
                        style="margin-right: 15px">
                        <a-image v-bind:src="`${updatedProduct.image}`" :width="100" style="border-radius: 10px;" />
                    </a-col>
                    <a-col>
                        <a-upload @change="uploadImageUpdatedProduct" list-type="picture-card"
                            @preview="handleUpdatedImagePreview" :maxCount="1" v-model:file-list="fileUpdatedImageList">
                            <div v-if="fileUpdatedImageList.length < 1">
                                <plus-outlined />
                                <div style="margin-top: 8px">Upload</div>
                            </div>
                        </a-upload>
                    </a-col>
                </a-row>
                <a-modal :open="previewUpdatedImageVisible" :title="previewUpdatedImageTitle" :footer="null"
                    @cancel="handlePreviewUpdatedImageCancel">
                    <img alt="image-product" style="width: 100%" :src="previewUpdatedImage" />
                </a-modal>
            </div>
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