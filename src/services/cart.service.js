import createApiClient from "./api.service";

class CartService {
    constructor(baseUrl = "/api/carts") {
        this.api = createApiClient(baseUrl);
    }
    async getCart(id) {
        return (await this.api.get(`/getCart/${id}`)).data;
    }
    // async createProduct(data) {
    //     return (await this.api.post("/createProduct", data)).data;
    // }
}

export default new CartService();