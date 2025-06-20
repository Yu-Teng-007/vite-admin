import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store/user";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        meta: {
            title: "首页",
            requiresAuth: true,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
        meta: {
            title: "登录",
            requiresAuth: false,
        },
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("@/views/Register.vue"),
        meta: {
            title: "注册",
            requiresAuth: false,
        },
    },
    {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: () => import("@/views/ForgotPassword.vue"),
        meta: {
            title: "忘记密码",
            requiresAuth: false,
        },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/NotFound.vue"),
        meta: {
            title: "404",
            requiresAuth: false,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 白名单路径，不需要登录就可以访问
const whiteList = ["/login", "/register", "/forgot-password"];

// 全局前置守卫
router.beforeEach(async (to, _from, next) => {
    // 设置页面标题
    document.title = (to.meta.title as string) || "移动端管理后台";

    const userStore = useUserStore();

    // 判断是否需要登录
    if (userStore.isLogin) {
        // 已登录状态
        if (to.path === "/login" || to.path === "/register" || to.path === "/forgot-password") {
            // 如果已登录，访问登录、注册或忘记密码页面则重定向到首页
            next({ path: "/" });
        } else {
            // 如果没有用户信息，先获取用户信息
            if (!userStore.userInfo) {
                try {
                    await userStore.getInfo();
                    next();
                } catch (error) {
                    // 获取用户信息失败，可能是token过期，需要重新登录
                    userStore.resetState();
                    next(`/login?redirect=${to.path}`);
                }
            } else {
                next();
            }
        }
    } else {
        // 未登录状态
        if (whiteList.includes(to.path)) {
            // 在免登录白名单中，直接进入
            next();
        } else {
            // 其他需要登录的页面，重定向到登录页
            next(`/login?redirect=${to.path}`);
        }
    }
});

export default router;
