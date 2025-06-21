import { createApp } from "vue";
import router from "./router";
import pinia from "./store";
import "./styles/reset.css";
import App from "./App.vue";
import { setupSvgIcon } from "./utils/svgIcon";
import "./utils/apiSwitch"; // 引入 API 切换工具

// 判断是否启用 Mock 数据
const useMock = import.meta.env.VITE_USE_MOCK === "true" || import.meta.env.VITE_USE_MOCK === true;

// 根据环境变量决定是否启用 Mock 数据
if (useMock) {
    console.log("🔧 启用 Mock 数据模式");
    import("./mock");
} else {
    console.log("🌐 连接真实后端服务");
}

const app = createApp(App);

// 注册SVG图标
setupSvgIcon(app);

app.use(pinia);
app.use(router);

app.mount("#app");
