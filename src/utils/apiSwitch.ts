/**
 * API 服务切换工具
 * 提供在开发环境中动态切换 Mock 数据和真实后端服务的功能
 */

import { API_CONFIG, ENV_INFO } from "@/config/api";

// 服务模式枚举
export enum ServiceMode {
    MOCK = "mock",
    REAL = "real",
}

// 当前服务模式
let currentMode: ServiceMode = API_CONFIG.useMock ? ServiceMode.MOCK : ServiceMode.REAL;

/**
 * 获取当前服务模式
 */
export function getCurrentMode(): ServiceMode {
    return currentMode;
}

/**
 * 切换服务模式（仅在开发环境有效）
 * @param mode 目标模式
 */
export function switchServiceMode(mode: ServiceMode): boolean {
    if (!ENV_INFO.isDev) {
        console.warn("⚠️ 服务模式切换仅在开发环境中可用");
        return false;
    }

    if (mode === currentMode) {
        console.log(`📌 当前已是 ${mode} 模式`);
        return true;
    }

    const oldMode = currentMode;
    currentMode = mode;

    console.log(`🔄 服务模式已从 ${oldMode} 切换到 ${mode}`);
    
    if (mode === ServiceMode.MOCK) {
        console.log("🔧 现在使用 Mock 数据");
        console.log("💡 提示：刷新页面以完全启用 Mock 拦截");
    } else {
        console.log("🌐 现在连接真实后端服务");
        console.log(`📡 后端地址：${API_CONFIG.backendURL}`);
    }

    return true;
}

/**
 * 切换到 Mock 模式
 */
export function switchToMock(): boolean {
    return switchServiceMode(ServiceMode.MOCK);
}

/**
 * 切换到真实服务模式
 */
export function switchToReal(): boolean {
    return switchServiceMode(ServiceMode.REAL);
}

/**
 * 获取服务状态信息
 */
export function getServiceStatus() {
    return {
        mode: currentMode,
        isMock: currentMode === ServiceMode.MOCK,
        isReal: currentMode === ServiceMode.REAL,
        baseURL: API_CONFIG.baseURL,
        backendURL: API_CONFIG.backendURL,
        timeout: API_CONFIG.timeout,
        environment: ENV_INFO.mode,
    };
}

/**
 * 打印服务状态
 */
export function printServiceStatus() {
    const status = getServiceStatus();
    console.log("📊 当前服务状态:", status);
}

// 在开发环境中将切换函数挂载到 window 对象，方便调试
if (ENV_INFO.isDev && typeof window !== "undefined") {
    (window as any).apiSwitch = {
        getCurrentMode,
        switchServiceMode,
        switchToMock,
        switchToReal,
        getServiceStatus,
        printServiceStatus,
        ServiceMode,
    };
    
    console.log("🛠️ API 切换工具已挂载到 window.apiSwitch");
    console.log("💡 使用方法：");
    console.log("  - window.apiSwitch.switchToMock() // 切换到 Mock 模式");
    console.log("  - window.apiSwitch.switchToReal() // 切换到真实服务模式");
    console.log("  - window.apiSwitch.printServiceStatus() // 查看当前状态");
}
