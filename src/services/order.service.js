import createApiClient from "./api.service";

class OrderService {
    constructor(baseUrl = "/api/orders") {
        this.api = createApiClient(baseUrl);
    }
    async getOrder(id) {
        return (await this.api.get(`/getOrder/${id}`)).data;
    }
    async getOrderDetails(id) {
        return (await this.api.get(`/getOrderDetails/${id}`)).data;
    }
    async getAllOrders() {
        return (await this.api.get(`/getAllOrders`)).data;
    }
    async createOrder(data) {
        return (await this.api.post("/createOrder", data)).data;
    }
    async updateOrderStatus(id, status) {
        return (await this.api.post(`/updateOrderStatus/${id}&${status}`)).data;
    }
    async cancelOrder(data, status) {
        console.log(data);
        return (await this.api.post(`/cancelOrder/${status}`, data)).data;
    }
}

export default new OrderService();