import Mock from "mockjs";

// 设置拦截ajax请求的相应时间
Mock.setup({
    timeout: "200-600",
});

// 获取mock.js的配置项
const configArray: any[] = [];

// 使用webpack的require.context自动引入所有mock文件
const files = import.meta.glob("./modules/*.ts", { eager: true });
Object.keys(files).forEach((key) => {
    if (key === "./index.ts") return;
    configArray.push((files[key] as any).default);
});

// 注册所有的mock服务
configArray.forEach((item) => {
    for (let [path, target] of Object.entries(item)) {
        const protocol = path.split("|");
        Mock.mock(
            new RegExp("^" + protocol[1]),
            protocol[0],
            // @ts-ignore
            target
        );
    }
});

export default Mock;
