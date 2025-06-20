import Mock from "mockjs";
import type { MockMethod } from "../types";

// 模拟用户数据
const userInfo = {
    id: 1,
    username: "admin",
    name: "管理员",
    avatar: Mock.Random.image("100x100", "#4A7BF7", "Avatar"),
    roles: ["admin"],
    permissions: ["*"],
};

// 登录接口
const login = (config: any) => {
    const { username, password } = JSON.parse(config.body);
    if (username === "admin" && password === "123456") {
        return {
            code: 200,
            data: {
                token: Mock.Random.guid(),
                userInfo,
            },
            message: "登录成功",
        };
    } else {
        return {
            code: 400,
            message: "用户名或密码错误",
        };
    }
};

// 获取用户信息
const getUserInfo = () => {
    return {
        code: 200,
        data: userInfo,
        message: "获取用户信息成功",
    };
};

// 退出登录
const logout = () => {
    return {
        code: 200,
        data: null,
        message: "退出登录成功",
    };
};

// 检查token是否有效
const checkToken = () => {
    return {
        code: 200,
        data: true,
        message: "token有效",
    };
};

export default {
    "post|/api/auth/login": login,
    "get|/api/auth/userInfo": getUserInfo,
    "post|/api/auth/logout": logout,
    "get|/api/auth/checkToken": checkToken,
} as MockMethod;
