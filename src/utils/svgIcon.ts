import type { App } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";

// 自动导入所有的svg图标
const svgRequire = import.meta.glob("@/assets/icons/*.svg", { eager: true });

// 注册SvgIcon组件
export function setupSvgIcon(app: App) {
    app.component("SvgIcon", SvgIcon);

    // 创建svg雪碧图
    const svgStore = document.createElement("svg");
    svgStore.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgStore.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svgStore.style.position = "absolute";
    svgStore.style.width = "0";
    svgStore.style.height = "0";
    svgStore.style.visibility = "hidden";

    // 遍历所有svg文件并添加到雪碧图中
    Object.keys(svgRequire).forEach((key) => {
        // 提取文件名作为图标名称
        const iconName = key.replace(/^.*[\\\/]/, "").replace(".svg", "");

        // 获取svg内容
        const svgContent = (svgRequire[key] as any).default;

        // 创建symbol元素
        const symbol = document.createElement("symbol");
        symbol.setAttribute("id", `icon-${iconName}`);
        symbol.setAttribute("viewBox", "0 0 1024 1024");
        symbol.innerHTML = svgContent.replace(/<svg[^>]*>|<\/svg>/g, "");

        // 添加到雪碧图中
        svgStore.appendChild(symbol);
    });

    // 添加到body中
    document.body.appendChild(svgStore);
}
