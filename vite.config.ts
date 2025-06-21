import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import path from "path";

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: ["vue", "vue-router", "pinia"],
            dts: "src/auto-imports.d.ts",
        }),
        Components({
            dts: "src/components.d.ts",
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    server: {
        port: 6000,
        host: true,
        proxy: {
            // 代理 API 请求到后端服务，排除前端路由
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: false,
                bypass(req, _res, _options) {
                    // 如果是前端路由（如 /api-test），则不代理
                    if (req.url?.startsWith("/api-test") || req.url?.startsWith("/api-")) {
                        return req.url;
                    }
                },
                // 可选：重写路径，如果后端没有 /api 前缀则取消注释下面这行
                // rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
