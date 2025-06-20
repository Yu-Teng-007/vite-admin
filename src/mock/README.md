# Mock 数据使用说明

本项目使用 [Mock.js](http://mockjs.com/) 来模拟接口数据，方便前端开发和调试。

## 目录结构

```
src/mock/
├── index.ts          # 入口文件，负责注册所有mock服务
├── types.ts          # 类型定义
└── modules/          # 模块目录
    ├── user.ts       # 用户相关接口
    └── auth.ts       # 认证相关接口
```

## 使用方法

### 1. 创建新的 Mock 模块

在 `src/mock/modules/` 目录下创建新的模块文件，例如 `product.ts`：

```typescript
import Mock from "mockjs";
import type { MockMethod } from "../types";

// 模拟数据
const productList = Mock.mock({
    "data|10": [
        {
            "id|+1": 1,
            name: "@ctitle(5, 10)",
            "price|1-1000": 1,
            image: "@image(200x200)",
            description: "@cparagraph(1, 3)",
        },
    ],
}).data;

// 获取产品列表
const getProductList = () => {
    return {
        code: 200,
        data: {
            total: productList.length,
            list: productList,
        },
        message: "获取产品列表成功",
    };
};

// 导出接口配置
export default {
    "get|/api/product/list": getProductList,
} as MockMethod;
```

### 2. 接口格式说明

Mock 接口的格式为：`'请求方法|接口URL': 处理函数`

例如：

-   `'get|/api/user/list'`: GET 请求，URL 为 `/api/user/list`
-   `'post|/api/user/login'`: POST 请求，URL 为 `/api/user/login`

### 3. 模拟数据语法

Mock.js 提供了丰富的数据模板语法，可以生成各种类型的随机数据：

```typescript
Mock.mock({
    name: "@cname", // 随机中文名
    "age|18-60": 1, // 18-60之间的随机数
    email: "@email", // 随机邮箱
    date: '@date("yyyy-MM-dd")', // 随机日期
    image: '@image("200x200")', // 随机图片
    paragraph: "@cparagraph", // 随机中文段落
    title: "@ctitle", // 随机中文标题
    address: "@county(true)", // 随机地址
    "id|+1": 1, // 自增ID
});
```

更多语法请参考 [Mock.js 文档](http://mockjs.com/examples.html)。

### 4. 开发环境配置

Mock 数据只在开发环境中启用，在 `src/main.ts` 中通过环境变量判断：

```typescript
// 判断环境变量是否为开发环境
const isDev = import.meta.env.MODE === "development";

// 在开发环境中使用mock数据
if (isDev) {
    import("./mock");
}
```

### 5. 示例页面

访问 `/mock-example` 路由可以查看使用 mock 数据的示例页面。
