import axios, { AxiosError } from "axios";
import { BASE_URL } from "./endpoints";

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(
    async (config: any) => {
        if (!config.url?.endsWith("token") || !config.url.endsWith("signup")) {
            const token = localStorage.getItem("@CRUD:token");

            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error: any) => {
        console.log(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            console.log("DESAUTENTICADO REALIZAR LOGIN");
            localStorage.removeItem("@CRUD:token");
        }
    }
);

export default api;