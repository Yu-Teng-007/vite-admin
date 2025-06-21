import Mock from "mockjs";
import type { MockMethod } from "../types";

// 模拟快递状态
const expressStatuses = ["已下单", "已揽收", "运输中", "派送中", "已签收", "异常", "退回"];

// 模拟城市列表
const cities = [
    "北京市",
    "上海市",
    "广州市",
    "深圳市",
    "杭州市",
    "南京市",
    "武汉市",
    "成都市",
    "西安市",
    "重庆市",
    "天津市",
    "苏州市",
];

// 模拟快递公司
const expressCompanies = [
    { code: "SF", name: "顺丰速运" },
    { code: "YTO", name: "圆通速递" },
    { code: "ZTO", name: "中通快递" },
    { code: "STO", name: "申通快递" },
    { code: "YD", name: "韵达速递" },
    { code: "HTKY", name: "百世快递" },
    { code: "JD", name: "京东物流" },
];

// 生成模拟快递数据
const generateExpressData = () => {
    return {
        id: Mock.Random.increment(),
        trackingNumber: Mock.mock(/SF[0-9]{13}/),
        status: Mock.Random.pick(expressStatuses),
        company: Mock.Random.pick(expressCompanies),
        from: {
            city: Mock.Random.pick(cities),
            name: Mock.mock("@cname"),
            phone: Mock.mock(/1[3-9]\d{9}/),
            address: Mock.mock("@county(true)@csentence(10, 20)"),
        },
        to: {
            city: Mock.Random.pick(cities),
            name: Mock.mock("@cname"),
            phone: Mock.mock(/1[3-9]\d{9}/),
            address: Mock.mock("@county(true)@csentence(10, 20)"),
        },
        weight: Mock.Random.float(0.1, 50, 1, 1),
        price: Mock.Random.float(10, 200, 2, 2),
        createTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
        updateTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
        estimatedTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
        remark: Mock.mock("@csentence(5, 15)"),
    };
};

// 生成物流轨迹数据
const generateTrackingData = () => {
    const tracks = [];
    const trackCount = Mock.Random.integer(3, 8);

    for (let i = 0; i < trackCount; i++) {
        tracks.push({
            time: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
            location: Mock.Random.pick(cities),
            status: Mock.mock("@csentence(10, 30)"),
            operator: Mock.mock("@cname"),
        });
    }

    return tracks.sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime());
};

// 查询快递信息
const getExpressInfo = (config: any) => {
    const { trackingNumber } = JSON.parse(config.body || "{}");

    if (!trackingNumber) {
        return {
            code: 400,
            message: "请输入运单号",
        };
    }

    const expressData = generateExpressData();
    const tracks = generateTrackingData();

    const result = {
        ...expressData,
        trackingNumber,
        tracks,
    };

    return {
        code: 200,
        data: result,
        message: "查询成功",
    };
};

// 获取快递列表
const getExpressList = () => {
    const list = [];
    const listCount = Mock.Random.integer(5, 10);

    for (let i = 0; i < listCount; i++) {
        list.push(generateExpressData());
    }

    return {
        code: 200,
        data: {
            total: list.length,
            list: list,
        },
        message: "获取快递列表成功",
    };
};

// 创建寄件订单
const createExpressOrder = (config: any) => {
    const orderData = JSON.parse(config.body);

    const newOrder = {
        ...generateExpressData(),
        ...orderData,
        trackingNumber: Mock.mock(/SF[0-9]{13}/),
        status: "已下单",
        id: Mock.Random.increment(),
    };

    return {
        code: 200,
        data: newOrder,
        message: "寄件订单创建成功",
    };
};

// 获取运费估算
const getShippingFee = (config: any) => {
    const { fromCity, toCity, weight } = JSON.parse(config.body || "{}");

    const baseFee = Mock.Random.float(10, 30, 2, 2);
    const weightFee = weight ? weight * Mock.Random.float(2, 8, 2, 2) : 0;
    const totalFee = baseFee + weightFee;

    return {
        code: 200,
        data: {
            baseFee,
            weightFee,
            totalFee,
            estimatedTime: "1-3个工作日",
            fromCity,
            toCity,
            weight,
        },
        message: "运费估算成功",
    };
};

// 获取快递公司列表
const getExpressCompanies = () => {
    return {
        code: 200,
        data: expressCompanies,
        message: "获取快递公司列表成功",
    };
};

export default {
    "post|/api/express/query": getExpressInfo,
    "get|/api/express/list": getExpressList,
    "post|/api/express/create": createExpressOrder,
    "post|/api/express/fee": getShippingFee,
    "get|/api/express/companies": getExpressCompanies,
} as MockMethod;
