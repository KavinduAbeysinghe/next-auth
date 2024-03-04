import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8081/api/v1",
    responseType: "json",
    headers: {},
});

axiosInstance.interceptors.request.use(
    async (request) => {
        const token = sessionStorage.getItem("access_token");
        if (!!token) {
            console.log(token);
            request.headers["Authorization"] = `Bearer ${token}`;
        }
        return request;
    }
)