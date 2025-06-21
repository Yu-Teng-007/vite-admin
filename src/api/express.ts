import { post, get } from "@/utils/request";

// 快递信息接口
export interface ExpressInfo {
    id: number;
    trackingNumber: string;
    status: string;
    company: {
        code: string;
        name: string;
    };
    from: {
        city: string;
        name: string;
        phone: string;
        address: string;
    };
    to: {
        city: string;
        name: string;
        phone: string;
        address: string;
    };
    weight: number;
    price: number;
    createTime: string;
    updateTime: string;
    estimatedTime: string;
    remark: string;
    tracks?: TrackingRecord[];
}

// 物流轨迹记录
export interface TrackingRecord {
    time: string;
    location: string;
    status: string;
    operator: string;
}

// 快递公司信息
export interface ExpressCompany {
    code: string;
    name: string;
}

// 运费估算结果
export interface ShippingFee {
    baseFee: number;
    weightFee: number;
    totalFee: number;
    estimatedTime: string;
    fromCity: string;
    toCity: string;
    weight: number;
}

// 查询快递信息参数
export interface QueryExpressParams {
    trackingNumber: string;
}

// 创建寄件订单参数
export interface CreateExpressOrderParams {
    from: {
        city: string;
        name: string;
        phone: string;
        address: string;
    };
    to: {
        city: string;
        name: string;
        phone: string;
        address: string;
    };
    weight: number;
    remark?: string;
    companyCode?: string;
}

// 运费估算参数
export interface ShippingFeeParams {
    fromCity: string;
    toCity: string;
    weight: number;
}

// 查询快递信息
export function queryExpress(params: QueryExpressParams) {
    return post<ExpressInfo>("/express/query", params);
}

// 获取快递列表
export function getExpressList() {
    return get<{
        total: number;
        list: ExpressInfo[];
    }>("/express/list");
}

// 创建寄件订单
export function createExpressOrder(params: CreateExpressOrderParams) {
    return post<ExpressInfo>("/express/create", params);
}

// 获取运费估算
export function getShippingFee(params: ShippingFeeParams) {
    return post<ShippingFee>("/express/fee", params);
}

// 获取快递公司列表
export function getExpressCompanies() {
    return get<ExpressCompany[]>("/express/companies");
}
