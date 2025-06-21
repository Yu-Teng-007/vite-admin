import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { useUserStore } from "@/store/user";
import { API_CONFIG } from "@/config/api";

// 创建 axios 实例
const service = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
});

// 是否显示请求日志
const showRequestLog = API_CONFIG.showRequestLog;

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        const userStore = useUserStore();
        // 如果有 token，添加到请求头
        if (userStore.token) {
            config.headers["Authorization"] = `Bearer ${userStore.token}`;
        }

        // 请求日志
        if (showRequestLog) {
            console.log("请求配置:", {
                url: config.url,
                method: config.method,
                params: config.params,
                data: config.data,
            });
        }

        return config;
    },
    (error) => {
        console.error("请求错误:", error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const res = response.data;

        // 响应日志
        if (showRequestLog) {
            console.log("响应数据:", {
                url: response.config.url,
                status: response.status,
                data: res,
            });
        }

        // 处理后端统一响应格式 { code: number, message: string, data: any }
        if (res.code !== undefined) {
            // 后端返回的统一格式
            if (res.code !== 200) {
                // 处理业务错误
                console.error("接口返回错误:", res.message || "未知错误");

                // 处理 token 过期等情况
                if (res.code === 401) {
                    // token 过期，清除用户信息并跳转到登录页
                    const userStore = useUserStore();
                    userStore.logout();
                    window.location.href = "/login";
                }

                return Promise.reject(new Error(res.message || "未知错误"));
            } else {
                // 正常返回数据
                return res.data !== undefined ? res.data : res;
            }
        } else {
            // 非统一格式的响应（可能是 Mock 数据或其他格式）
            return res;
        }
    },
    (error) => {
        console.error("响应错误:", error);
        return Promise.reject(error);
    }
);

// 封装 GET 请求
export function get<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, { params, ...config });
}

// 封装 POST 请求
export function post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config);
}

// 封装 PUT 请求
export function put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config);
}

// 封装 DELETE 请求
export function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config);
}

export default service;
