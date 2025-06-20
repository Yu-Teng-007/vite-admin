import { defineStore } from "pinia";
import {
    getToken,
    setToken,
    removeToken,
    getUserInfo as getStorageUserInfo,
    setUserInfo as setStorageUserInfo,
    clearAuth,
} from "@/utils/auth";
import { login as loginApi, getUserInfo as getUserInfoApi, logout as logoutApi } from "@/api/auth";
import type { LoginParams } from "@/api/auth";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", {
    state: () => ({
        token: getToken(),
        userInfo: getStorageUserInfo(),
    }),
    getters: {
        isLogin: (state) => !!state.token,
    },
    actions: {
        // 设置token
        setToken(token: string) {
            this.token = token;
            setToken(token);
        },
        // 设置用户信息
        setUserInfo(userInfo: any) {
            this.userInfo = userInfo;
            setStorageUserInfo(userInfo);
        },
        // 登录
        async login(loginParams: LoginParams) {
            try {
                const { token, userInfo } = await loginApi(loginParams);
                this.setToken(token);
                this.setUserInfo(userInfo);
                return true;
            } catch (error) {
                return false;
            }
        },
        // 获取用户信息
        async getInfo() {
            try {
                const userInfo = await getUserInfoApi();
                this.setUserInfo(userInfo);
                return userInfo;
            } catch (error) {
                return null;
            }
        },
        // 退出登录
        async logout() {
            try {
                await logoutApi();
            } catch (error) {
                console.error("登出请求失败", error);
            } finally {
                this.resetState();
            }
        },
        // 重置状态
        resetState() {
            this.token = "";
            this.userInfo = null;
            clearAuth();
        },
    },
});
