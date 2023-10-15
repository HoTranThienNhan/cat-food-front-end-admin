import createApiClient from "./api.service";

class ProductService {
    constructor(baseUrl = "/api/products") {
        this.api = createApiClient(baseUrl);
    }
    async getAllProducts() {
        return (await this.api.get("/getAllProducts")).data;
    }
    async createProduct(data) {
        return (await this.api.post("/createProduct", data)).data;
    }
}

export default new ProductService();