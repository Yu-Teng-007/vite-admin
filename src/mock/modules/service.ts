import Mock from "mockjs";
import type { MockMethod } from "../types";

// 发票类型
const invoiceTypes = [
    { type: "personal", name: "个人发票" },
    { type: "company", name: "企业发票" },
    { type: "vat", name: "增值税专用发票" }
];

// 发票状态
const invoiceStatuses = [
    { status: "pending", name: "待开具", color: "#faad14" },
    { status: "processing", name: "开具中", color: "#1890ff" },
    { status: "completed", name: "已开具", color: "#52c41a" },
    { status: "failed", name: "开具失败", color: "#ff4d4f" }
];

// 客服会话状态
const chatStatuses = [
    { status: "waiting", name: "等待中" },
    { status: "connected", name: "已连接" },
    { status: "ended", name: "已结束" }
];

// 同城跑腿服务类型
const errandTypes = [
    { type: "pickup", name: "代取件", icon: "📦", basePrice: 8 },
    { type: "delivery", name: "代送件", icon: "🚚", basePrice: 12 },
    { type: "buy", name: "代购买", icon: "🛒", basePrice: 15 },
    { type: "queue", name: "代排队", icon: "👥", basePrice: 20 },
    { type: "other", name: "其他服务", icon: "🔧", basePrice: 10 }
];

// 生成发票数据
const generateInvoices = () => {
    return Mock.mock({
        "invoices|5-15": [{
            id: "@increment",
            orderNumber: /SF[0-9]{13}/,
            type: () => Mock.Random.pick(invoiceTypes),
            status: () => Mock.Random.pick(invoiceStatuses),
            amount: "@float(10, 1000, 2, 2)",
            title: "@ctitle(5, 15)",
            taxNumber: /[0-9]{15,20}/,
            address: "@county(true)@csentence(10, 20)",
            phone: /1[3-9]\d{9}/,
            bankName: "@ctitle(5, 10)银行",
            bankAccount: /[0-9]{16,20}/,
            applyTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
            issueTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
            downloadUrl: "/invoice/@increment.pdf",
            remark: "@csentence(5, 15)"
        }]
    }).invoices.sort((a: any, b: any) => new Date(b.applyTime).getTime() - new Date(a.applyTime).getTime());
};

// 生成客服消息数据
const generateChatMessages = () => {
    return Mock.mock({
        "messages|10-30": [{
            id: "@increment",
            type: () => Mock.Random.pick(["user", "service"]),
            content: "@csentence(5, 30)",
            time: "@datetime('yyyy-MM-dd HH:mm:ss')",
            avatar: "@image('40x40', '@color', '@first')",
            messageType: () => Mock.Random.pick(["text", "image", "file"]),
            isRead: "@boolean"
        }]
    }).messages.sort((a: any, b: any) => new Date(a.time).getTime() - new Date(b.time).getTime());
};

// 生成运费时效数据
const generateShippingOptions = () => {
    return Mock.mock({
        "options|3-6": [{
            id: "@increment",
            name: "@ctitle(4, 8)",
            description: "@csentence(10, 20)",
            estimatedTime: () => Mock.Random.pick(["当日达", "次日达", "2-3天", "3-5天", "5-7天"]),
            price: "@float(8, 50, 2, 2)",
            originalPrice: function() {
                return this.price * Mock.Random.float(1.1, 1.5, 2, 2);
            },
            discount: function() {
                return ((this.originalPrice - this.price) / this.originalPrice * 100).toFixed(0);
            },
            features: [
                "@ctitle(3, 6)",
                "@ctitle(3, 6)",
                "@ctitle(3, 6)"
            ],
            isRecommended: "@boolean",
            coverage: "@ctitle(3, 8)地区"
        }]
    }).options;
};

// 获取发票列表
const getInvoices = (config: any) => {
    const { page = 1, pageSize = 10, status = "all" } = JSON.parse(config.body || '{}');
    let invoices = generateInvoices();
    
    if (status !== "all") {
        invoices = invoices.filter((item: any) => item.status.status === status);
    }
    
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const list = invoices.slice(start, end);
    
    return {
        code: 200,
        data: {
            total: invoices.length,
            page,
            pageSize,
            list
        },
        message: "获取发票列表成功"
    };
};

// 申请开具发票
const applyInvoice = (config: any) => {
    const invoiceData = JSON.parse(config.body);
    
    const newInvoice = {
        id: Mock.Random.increment(),
        ...invoiceData,
        status: invoiceStatuses[0], // pending
        applyTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')")
    };
    
    return {
        code: 200,
        data: newInvoice,
        message: "发票申请提交成功"
    };
};

// 开始客服会话
const startChat = () => {
    const sessionId = Mock.mock("@guid");
    
    return {
        code: 200,
        data: {
            sessionId,
            status: chatStatuses[0], // waiting
            queuePosition: Mock.Random.integer(1, 10),
            estimatedWaitTime: Mock.Random.integer(1, 5) + "分钟",
            serviceInfo: {
                name: "@cname",
                avatar: "@image('60x60', '@color', '@first')",
                workTime: "9:00-18:00"
            }
        },
        message: "客服会话创建成功"
    };
};

// 获取聊天记录
const getChatHistory = (config: any) => {
    const sessionId = config.url.split('/').pop();
    const messages = generateChatMessages();
    
    return {
        code: 200,
        data: {
            sessionId,
            messages,
            status: Mock.Random.pick(chatStatuses)
        },
        message: "获取聊天记录成功"
    };
};

// 发送消息
const sendMessage = (config: any) => {
    const { sessionId, content, messageType = "text" } = JSON.parse(config.body);
    
    const message = {
        id: Mock.Random.increment(),
        type: "user",
        content,
        messageType,
        time: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
        isRead: false
    };
    
    return {
        code: 200,
        data: message,
        message: "消息发送成功"
    };
};

// 查询运费时效
const getShippingOptions = (config: any) => {
    const { fromCity, toCity, weight } = JSON.parse(config.body || '{}');
    const options = generateShippingOptions();
    
    return {
        code: 200,
        data: {
            fromCity,
            toCity,
            weight,
            options,
            estimatedDate: Mock.mock("@date('yyyy-MM-dd')")
        },
        message: "运费时效查询成功"
    };
};

// 获取同城跑腿服务列表
const getErrandServices = () => {
    return {
        code: 200,
        data: errandTypes,
        message: "获取跑腿服务列表成功"
    };
};

// 创建跑腿订单
const createErrandOrder = (config: any) => {
    const orderData = JSON.parse(config.body);
    const serviceType = errandTypes.find(type => type.type === orderData.serviceType);
    
    const order = {
        id: Mock.Random.increment(),
        orderNumber: Mock.mock(/ER[0-9]{13}/),
        ...orderData,
        serviceType,
        status: "待接单",
        totalPrice: serviceType ? serviceType.basePrice + Mock.Random.float(0, 20, 2, 2) : 0,
        createTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
        estimatedTime: Mock.Random.integer(30, 120) + "分钟"
    };
    
    return {
        code: 200,
        data: order,
        message: "跑腿订单创建成功"
    };
};

// 获取手机回收估价
const getPhoneRecyclePrice = (config: any) => {
    const { brand, model, condition } = JSON.parse(config.body || '{}');
    
    const basePrice = Mock.Random.float(100, 3000, 2, 2);
    const conditionMultiplier = {
        "全新": 1.0,
        "99新": 0.9,
        "95新": 0.8,
        "9成新": 0.7,
        "8成新": 0.6,
        "7成新": 0.5
    };
    
    const finalPrice = basePrice * (conditionMultiplier[condition as keyof typeof conditionMultiplier] || 0.5);
    
    return {
        code: 200,
        data: {
            brand,
            model,
            condition,
            estimatedPrice: finalPrice.toFixed(2),
            priceRange: `${(finalPrice * 0.8).toFixed(2)}-${(finalPrice * 1.2).toFixed(2)}`,
            validDays: 7,
            recycleProcess: [
                "在线估价",
                "预约上门",
                "专业检测",
                "确认价格",
                "当场付款"
            ]
        },
        message: "手机回收估价成功"
    };
};

export default {
    "post|/api/service/invoices": getInvoices,
    "post|/api/service/invoice/apply": applyInvoice,
    "post|/api/service/chat/start": startChat,
    "get|/api/service/chat/(.*)": getChatHistory,
    "post|/api/service/chat/send": sendMessage,
    "post|/api/service/shipping/options": getShippingOptions,
    "get|/api/service/errand/services": getErrandServices,
    "post|/api/service/errand/create": createErrandOrder,
    "post|/api/service/phone/recycle": getPhoneRecyclePrice,
} as MockMethod;
