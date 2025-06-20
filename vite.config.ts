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
});
