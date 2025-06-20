import { createApp } from "vue";
import router from "./router";
import pinia from "./store";
import "./styles/reset.css";
import App from "./App.vue";
import { setupSvgIcon } from "./utils/svgIcon";

// 判断环境变量是否为开发环境
const isDev = import.meta.env.MODE === "development";

// 在开发环境中使用mock数据
if (isDev) {
    import("./mock");
}

const app = createApp(App);

// 注册SVG图标
setupSvgIcon(app);

app.use(pinia);
app.use(router);

app.mount("#app");
