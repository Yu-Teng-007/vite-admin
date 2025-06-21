/**
 * API 配置文件
 * 统一管理 API 相关配置
 */

// API 基础配置
export const API_CONFIG = {
    // 基础 URL
    baseURL: import.meta.env.VITE_API_BASE_URL || "/api",

    // 后端服务地址
    backendURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",

    // 请求超时时间
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,

    // 是否启用 Mock 数据
    useMock: import.meta.env.VITE_USE_MOCK === "true",

    // 是否显示请求日志
    showRequestLog: import.meta.env.VITE_CONSOLE_REQUEST_LOG === "true",
};

// API 端点配置
export const API_ENDPOINTS = {
    // 认证相关
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        LOGOUT: "/auth/logout",
        USER_INFO: "/auth/userInfo",
        CHECK_TOKEN: "/auth/check",
    },

    // 用户相关
    USER: {
        PROFILE: "/user/profile",
        MEMBER: "/user/member",
        COUPONS: "/user/coupons",
        CLAIM_COUPON: "/user/coupon/claim",
        RECHARGE_CARDS: "/user/recharge-cards",
        BUY_RECHARGE_CARD: "/user/recharge-card/buy",
        SVIP: "/user/svip",
        SUBSCRIBE_SVIP: "/user/svip/subscribe",
    },

    // 快递相关
    EXPRESS: {
        QUERY: "/express/query",
        LIST: "/express/list",
        CREATE: "/express/create",
        FEE: "/express/fee",
        COMPANIES: "/express/companies",
    },

    // 促销活动相关
    PROMOTION: {
        LIST: "/promotion/list",
        DETAIL: "/promotion/:id",
        PARTICIPATE: "/promotion/participate",
        CARDS: "/promotion/cards",
        NOTIFICATIONS: "/promotion/notifications",
    },

    // 综合服务相关
    SERVICE: {
        INVOICES: "/service/invoices",
        APPLY_INVOICE: "/service/invoice/apply",
        START_CHAT: "/service/chat/start",
        CHAT_HISTORY: "/service/chat/:sessionId",
        SEND_MESSAGE: "/service/chat/send",
        SHIPPING_OPTIONS: "/service/shipping/options",
        ERRAND_SERVICES: "/service/errand/services",
        CREATE_ERRAND: "/service/errand/create",
        PHONE_RECYCLE: "/service/phone/recycle",
    },
};

// 环境信息
export const ENV_INFO = {
    mode: import.meta.env.MODE,
    isDev: import.meta.env.MODE === "development",
    isProd: import.meta.env.MODE === "production",
    useMock: API_CONFIG.useMock,
};

// 打印配置信息（仅在开发环境）
if (ENV_INFO.isDev && API_CONFIG.showRequestLog) {
    console.log("📋 API 配置信息:", {
        baseURL: API_CONFIG.baseURL,
        backendURL: API_CONFIG.backendURL,
        timeout: API_CONFIG.timeout,
        useMock: API_CONFIG.useMock,
        mode: ENV_INFO.mode,
    });
}
