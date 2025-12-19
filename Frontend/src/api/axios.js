import axios from "axios";
import conf from "../conf/conf";

const API = axios.create({
    baseURL: conf.baseUrl,
    withCredentials: true,
})

const protectedRoutes = [
    "/users/logout",
    "/users/current-user",
    "/blogs",
    "/blogs/"
];

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if(error) {
            prom.reject(error);
        }else{
            prom.resolve(token);
        }
    });
    failedQueue = [];
}

API.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;
        if(!originalRequest) return Promise.reject(err);

        if(originalRequest.url.includes("/users/refresh-token")) {
            return Promise.reject(err);
        }

        const isProtected = protectedRoutes.some(
            (route) => originalRequest.url.startsWith(route)
        );

        if(!isProtected) return Promise.reject(err);

        if(err.response?.status === 401 && !originalRequest._retry) {
            if(isRefreshing) {
                return new Promise((resolve, reject) => {
                        failedQueue.push({resolve, reject});
                    }).then(() => API(originalRequest));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try{
                await API.post("/users/refresh-token");
                isRefreshing = false;
                processQueue(null);
                return API(originalRequest);
            }catch (refreshError) {
                isRefreshing = false;
                processQueue(refreshError, null)
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(err)
    }
);

export default API;