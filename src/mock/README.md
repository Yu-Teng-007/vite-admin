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

访问 `/mock-test` 路由可以查看使用 mock 数据的测试页面。

## 已实现的 Mock 接口

### 快递相关接口 (express.ts)

-   `POST /api/express/query` - 查询快递信息
-   `GET /api/express/list` - 获取快递列表
-   `POST /api/express/create` - 创建寄件订单
-   `POST /api/express/fee` - 获取运费估算
-   `GET /api/express/companies` - 获取快递公司列表

### 用户服务接口 (user.ts)

-   `GET /api/user/profile` - 获取用户信息
-   `GET /api/user/member` - 获取会员信息
-   `POST /api/user/coupons` - 获取优惠券列表
-   `POST /api/user/coupon/claim` - 领取优惠券
-   `GET /api/user/recharge-cards` - 获取充值卡列表
-   `POST /api/user/recharge-card/buy` - 购买充值卡
-   `GET /api/user/svip` - 获取 SVIP 信息
-   `POST /api/user/svip/subscribe` - 开通 SVIP

### 促销活动接口 (promotion.ts)

-   `GET /api/promotion/cards` - 获取首页促销卡片
-   `POST /api/promotion/notifications` - 获取通知消息列表
-   `POST /api/promotion/notification/read` - 标记通知为已读
-   `POST /api/promotion/activities` - 获取活动列表
-   `POST /api/promotion/activity/join` - 参与活动
-   `GET /api/promotion/activity/:id` - 获取活动详情
-   `GET /api/promotion/banners` - 获取轮播图数据

### 业务服务接口 (service.ts)

-   `POST /api/service/invoices` - 获取发票列表
-   `POST /api/service/invoice/apply` - 申请开具发票
-   `POST /api/service/chat/start` - 开始客服会话
-   `GET /api/service/chat/:sessionId` - 获取聊天记录
-   `POST /api/service/chat/send` - 发送消息
-   `POST /api/service/shipping/options` - 查询运费时效
-   `GET /api/service/errand/services` - 获取同城跑腿服务列表
-   `POST /api/service/errand/create` - 创建跑腿订单
-   `POST /api/service/phone/recycle` - 获取手机回收估价

## 数据特点

所有 mock 数据都使用 Mock.js 生成，具有以下特点：

-   数据结构真实，符合业务逻辑
-   支持中文姓名、地址、电话等本土化数据
-   随机生成但保持一致性
-   支持分页、筛选等常见查询参数
-   包含完整的错误处理和状态码

## 使用建议

1. 在开发环境中启用 mock 数据进行前端开发
2. 使用测试页面验证接口功能
3. 根据实际业务需求调整 mock 数据结构
4. 在生产环境中替换为真实 API 接口
