import { post, get } from "@/utils/request";

// 发票类型
export interface InvoiceType {
    type: string;
    name: string;
}

// 发票状态
export interface InvoiceStatus {
    status: string;
    name: string;
    color: string;
}

// 发票信息
export interface Invoice {
    id: number;
    orderNumber: string;
    type: InvoiceType;
    status: InvoiceStatus;
    amount: number;
    title: string;
    taxNumber: string;
    address: string;
    phone: string;
    bankName: string;
    bankAccount: string;
    applyTime: string;
    issueTime: string;
    downloadUrl: string;
    remark: string;
}

// 客服会话状态
export interface ChatStatus {
    status: string;
    name: string;
}

// 客服消息
export interface ChatMessage {
    id: number;
    type: "user" | "service";
    content: string;
    time: string;
    avatar: string;
    messageType: "text" | "image" | "file";
    isRead: boolean;
}

// 客服会话信息
export interface ChatSession {
    sessionId: string;
    status: ChatStatus;
    queuePosition: number;
    estimatedWaitTime: string;
    serviceInfo: {
        name: string;
        avatar: string;
        workTime: string;
    };
}

// 运费时效选项
export interface ShippingOption {
    id: number;
    name: string;
    description: string;
    estimatedTime: string;
    price: number;
    originalPrice: number;
    discount: string;
    features: string[];
    isRecommended: boolean;
    coverage: string;
}

// 跑腿服务类型
export interface ErrandType {
    type: string;
    name: string;
    icon: string;
    basePrice: number;
}

// 跑腿订单
export interface ErrandOrder {
    id: number;
    orderNumber: string;
    serviceType: ErrandType;
    status: string;
    totalPrice: number;
    createTime: string;
    estimatedTime: string;
}

// 手机回收估价结果
export interface PhoneRecyclePrice {
    brand: string;
    model: string;
    condition: string;
    estimatedPrice: string;
    priceRange: string;
    validDays: number;
    recycleProcess: string[];
}

// 获取发票列表参数
export interface GetInvoicesParams {
    page?: number;
    pageSize?: number;
    status?: string;
}

// 申请发票参数
export interface ApplyInvoiceParams {
    orderNumber: string;
    type: string;
    amount: number;
    title: string;
    taxNumber?: string;
    address?: string;
    phone?: string;
    bankName?: string;
    bankAccount?: string;
    remark?: string;
}

// 发送消息参数
export interface SendMessageParams {
    sessionId: string;
    content: string;
    messageType?: "text" | "image" | "file";
}

// 查询运费时效参数
export interface GetShippingOptionsParams {
    fromCity: string;
    toCity: string;
    weight: number;
}

// 创建跑腿订单参数
export interface CreateErrandOrderParams {
    serviceType: string;
    description: string;
    pickupAddress: string;
    deliveryAddress: string;
    contactPhone: string;
    remark?: string;
}

// 手机回收估价参数
export interface GetPhoneRecyclePriceParams {
    brand: string;
    model: string;
    condition: string;
}

// 获取发票列表
export function getInvoices(params: GetInvoicesParams = {}) {
    return post<{
        total: number;
        page: number;
        pageSize: number;
        list: Invoice[];
    }>("/service/invoices", params);
}

// 申请开具发票
export function applyInvoice(params: ApplyInvoiceParams) {
    return post<Invoice>("/service/invoice/apply", params);
}

// 开始客服会话
export function startChat() {
    return post<ChatSession>("/service/chat/start");
}

// 获取聊天记录
export function getChatHistory(sessionId: string) {
    return get<{
        sessionId: string;
        messages: ChatMessage[];
        status: ChatStatus;
    }>(`/service/chat/${sessionId}`);
}

// 发送消息
export function sendMessage(params: SendMessageParams) {
    return post<ChatMessage>("/service/chat/send", params);
}

// 查询运费时效
export function getShippingOptions(params: GetShippingOptionsParams) {
    return post<{
        fromCity: string;
        toCity: string;
        weight: number;
        options: ShippingOption[];
        estimatedDate: string;
    }>("/service/shipping/options", params);
}

// 获取同城跑腿服务列表
export function getErrandServices() {
    return get<ErrandType[]>("/service/errand/services");
}

// 创建跑腿订单
export function createErrandOrder(params: CreateErrandOrderParams) {
    return post<ErrandOrder>("/service/errand/create", params);
}

// 获取手机回收估价
export function getPhoneRecyclePrice(params: GetPhoneRecyclePriceParams) {
    return post<PhoneRecyclePrice>("/service/phone/recycle", params);
}
