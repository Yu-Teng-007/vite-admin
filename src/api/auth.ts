import { post, get } from "@/utils/request";

// 登录接口
export interface LoginParams {
    username: string;
    password: string;
}

export interface LoginResult {
    token: string;
    userInfo: {
        id: number;
        username: string;
        name: string;
        avatar?: string;
    };
}

// 登录
export function login(data: LoginParams) {
    return post<LoginResult>("/auth/login", data);
}

// 获取用户信息
export function getUserInfo() {
    return get<LoginResult["userInfo"]>("/auth/userInfo");
}

// 退出登录
export function logout() {
    return post("/auth/logout");
}

// 检查token是否有效
export function checkToken() {
    return get<boolean>("/auth/checkToken");
}
