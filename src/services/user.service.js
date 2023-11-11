import createApiClient from "./api.service";

class UserService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl);
    }
    async getAllUsers() {
        return (await this.api.get("/getAllUsers")).data;
    }
    async signup(data) {
        return (await this.api.post("/signup", data)).data;
    }
    async signinAdmin(data) {
        return (await this.api.post("/signinAdmin", data)).data;
    }
    async getUserDetails(id) {
        return (await this.api.get(`/getUserDetails/${id}`)).data;
    }
    async getUserDetailsByEmail(id) {
        return (await this.api.get(`/getUserDetailsByEmail/${id}`)).data;
    }
    async updateUser(id, data) {
        return (await this.api.put(`/updateUser/${id}`, data)).data;
    }
    async deleteUser(id) {
        return (await this.api.delete(`/deleteUser/${id}`)).data;
    }
}

export default new UserService();