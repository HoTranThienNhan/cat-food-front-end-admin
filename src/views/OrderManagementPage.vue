<script setup>
import { router } from '@/router';
import { ref, onMounted, reactive } from 'vue';
import { getBase64, checkCancelableOrderStatus, convertMongoDBDate } from '@/utils';
import { FormOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import OrderService from '@/services/order.service';
import { useAuthStore } from '@/stores/auth.store';
import { useRoute } from 'vue-router';

const route = useRoute();

const authStore = useAuthStore();
let user = ref(authStore?.user);


if (user?.value && user?.value?.role !== "General Manager" && user?.value?.role !== "Order Manager") {
    router.push({
        name: "notfoundpage",
        params: {
            pathMatch: route.path.split("/").slice(1)
        },
        query: route.query,
        hash: route.hash,
    });
}

let columns = [];


const dataOrder = ref([]);
let allOrders = [];
const fetchAllOrders = async () => {
    allOrders = await OrderService.getAllOrders();

    dataOrder.value = allOrders?.map((order, index) => {
        return {
            ...order,
            key: order._id
        }
    });

    // columns table
    columns = [
        {
            title: 'Mã Đơn',
            dataIndex: '_id',
            sorter: (a, b) => a._id.localeCompare(b._id),
        },
        {
            title: 'Tên Người Đặt',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Phí Vận Chuyển',
            dataIndex: 'deliveryFee',
            sorter: (a, b) => a.deliveryFee - b.deliveryFee,
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
        },
        {
            title: 'Phương Thức Thanh Toán',
            dataIndex: 'method',
            filters: [
                {
                    text: 'COD',
                    value: 'COD',
                },
            ],
            filterMultiple: false,
            onFilter: (value, record) => record.method.indexOf(value) === 0,
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            // filters: [
            //     {
            //         text: 'Chờ Xác Nhận',
            //         value: 'Chờ Xác Nhận',
            //     },
            //     {
            //         text: 'Đã Hủy',
            //         value: 'Đã Hủy',
            //     },
            // ],
            // filterMultiple: false,
            // onFilter: (value, record) => record.method.indexOf(value) === 0,
        },
        {
            title: 'Ngày Đặt',
            dataIndex: 'createdAt',
            // sorter: (a, b) => a.createdAt - b.createdAt,
        },
        {
            title: 'Chi Tiết',
            dataIndex: 'edit',
        },
    ];
}


onMounted(() => {
    // fetchAllProducts();
    fetchAllOrders();
});

const onChange = (pagination, filters, sorter) => {
};

const openModalOrderDetails = ref(false);
const thisOrder = ref([]);
const handleOrderDetails = async (key) => {
    openModalOrderDetails.value = true;

    thisOrder.value = await OrderService.getOrderDetails(key);
}

const handleOk = () => {
    openModalOrderDetails.value = false;
}


const updateOrderStatus = async (id, currentStatus) => {
    let status = currentStatus;
    if (currentStatus === 'Chờ Xác Nhận') {
        status = 'Chờ Lấy Hàng';
    } else if (currentStatus === 'Chờ Lấy Hàng') {
        status = 'Đang Giao';
    } else if (currentStatus === 'Đang Giao') {
        status = 'Đã Giao';
    }
    await OrderService.updateOrderStatus(id, status);
    fetchAllOrders();
    thisOrder.value[0].status = status;
    message.success('Cập nhật trạng thái đơn hàng thành công', 3);
}

const cancelOrder = async (order) => {
    await OrderService.cancelOrder(order, "Đã Hủy");
    message.success('Hủy đơn hàng thành công', 3);
    thisOrder.value[0].status = 'Đã Hủy';
    fetchAllOrders();
}


// navigate
const goToHomePage = () => {
    router.push({ name: "homepage" });
}
</script>

<template>
    <a-row style="margin: 100px 50px 0px 50px;">
        <a-col span="24">
            <a-row justify="center">
                <a-col style="margin-bottom: 20px;">
                    <h4>QUẢN LÝ ĐƠN HÀNG</h4>
                </a-col>
            </a-row>
        </a-col>
        <a-col span="24">
            <a-table bordered :columns="columns" :data-source="dataOrder" @change="onChange">
                <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex === 'edit'">
                        <FormOutlined style="font-size: 20px;" @click="() => handleOrderDetails(record.key)" />
                    </template>
                </template>
            </a-table>
        </a-col>
    </a-row>

    <a-modal v-model:open="openModalOrderDetails" width="800px" title="Chi Tiết Đơn Hàng" style="top: 50px">
        <template #footer>
            <a-button key="submit" type="primary" :loading="loading" @click="handleOk">OK</a-button>
        </template>
        <a-row>
            <a-col span="12">
                <a-col span="24">
                    ID Đơn Hàng: <span style="font-weight: 600;">#{{ thisOrder[0]?._id }}</span>
                </a-col>
                <a-col span="24">
                    Ngày Đặt: <span style="font-weight: 600;">{{ convertMongoDBDate(thisOrder[0]?.createdAt) }}</span>
                </a-col>
                <a-col span="24">
                    Trạng thái: <span style="font-weight: 600;">{{ thisOrder[0]?.status }}</span>
                </a-col>
            </a-col>
            <a-col span="12">
                <a-popconfirm v-if="thisOrder[0]?.status !== 'Đã Hủy' && thisOrder[0]?.status !== 'Đã Giao'"
                    title="Bạn có muốn cập nhật trạng thái đơn hàng này？"
                    @confirm="updateOrderStatus(thisOrder[0]?._id, thisOrder[0]?.status)">
                    <a-button type="primary" style="margin-right: 20px">
                        Cập Nhật Trạng Thái
                    </a-button>
                </a-popconfirm>
                <a-popconfirm v-if="checkCancelableOrderStatus(thisOrder[0]?.status)" title="Bạn có muốn hủy đơn hàng này？"
                    @confirm="cancelOrder(thisOrder[0])">
                    <a-button type="primary" danger>
                        Hủy Đơn Hàng
                    </a-button>
                </a-popconfirm>
            </a-col>
            <a-col span="24" style="margin-top: 20px;">
                <a-row>
                    <a-col span="12">
                        <div style="font-weight: 600; font-size: 16px; margin-bottom: 5px;">Thông Tin Giao Hàng</div>
                        <div>
                            Họ Tên: <span style="font-weight: 600;">{{ thisOrder[0]?.name }}</span>
                        </div>
                        <div>
                            Số Điện Thoại: <span style="font-weight: 600;">{{ thisOrder[0]?.phone }}</span>
                        </div>
                        <div>
                            Địa Chỉ: <span style="font-weight: 600;">{{ thisOrder[0]?.address }}</span>
                        </div>
                    </a-col>
                    <a-col span="12">
                        <div style="font-weight: 600; font-size: 16px;  margin-bottom: 5px;">Thông Tin Đơn Hàng</div>
                        <div>
                            Phương Thức Thanh Toán: <span style="font-weight: 600;">{{ thisOrder[0]?.method }}</span>
                        </div>
                        <div>
                            Phí Vận Chuyển: <span style="font-weight: 600;">{{ thisOrder[0]?.deliveryFee.toLocaleString() }}
                                VNĐ</span>
                        </div>
                        <div>
                            Tổng Tiền: <span style="font-weight: 600;">{{ thisOrder[0]?.totalPrice.toLocaleString() }}
                                VNĐ</span>
                        </div>
                    </a-col>
                </a-row>
            </a-col>
            <a-col span="24" style="margin-top: 20px;">
                <div style="font-weight: 600; font-size: 16px; margin-bottom: 10px;">Thông Tin Sản Phẩm</div>
                <a-card v-for="(product, index) in thisOrder[0]?.products" style="margin-bottom: 10px">
                    <a-row>
                        <a-col span="4">
                            <a-image v-bind:src="`${product?.image}`" :width="80" :height="80" :preview="false"
                                :previewMask="false" />
                        </a-col>
                        <a-col span="9" style="display: flex; align-items: center;">
                            <span style="font-size: 16px; font-weight: 600;">{{ product?.name }}</span>
                        </a-col>
                        <a-col span="3" style="display: flex; align-items: center;">
                            <span style="font-size: 16px; font-weight: 600;">{{ product?.type }}</span>
                        </a-col>
                        <a-col span="5" style="display: flex; align-items: center;">
                            <span style="font-size: 16px; font-weight: 600;">{{ product?.price?.toLocaleString() }}
                                VNĐ</span>
                        </a-col>
                        <a-col span="3" style="display: flex; align-items: center;">
                            <span style="font-size: 16px; font-weight: 600;">x{{ product?.amount }}</span>
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
        </a-row>
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
</style>