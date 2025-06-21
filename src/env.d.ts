/// <reference types="vite/client" />

// 声明 .vue 文件模块
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_BACKEND_URL: string;
    readonly VITE_APP_TITLE: string;
    readonly VITE_API_TIMEOUT: string;
    readonly VITE_API_ENCRYPT?: string;
    readonly VITE_USE_MOCK?: string;
    readonly VITE_USE_DEBUGGER?: string;
    readonly VITE_CONSOLE_REQUEST_LOG?: string;
    readonly VITE_CDN_URL?: string;
    readonly VITE_BUILD_GZIP?: string;
    readonly VITE_DROP_CONSOLE?: string;
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
