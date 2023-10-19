import createApiClient from "./api.service";

class OrderService {
    constructor(baseUrl = "/api/orders") {
        this.api = createApiClient(baseUrl);
    }
    async getOrder(id) {
        return (await this.api.get(`/getOrder/${id}`)).data;
    }
    async createOrder(data) {
        return (await this.api.post("/createOrder", data)).data;
    }
}

export default new OrderService();