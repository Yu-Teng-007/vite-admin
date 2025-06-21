import { post, get } from "@/utils/request";

// 会员等级信息
export interface MemberLevel {
    level: number;
    name: string;
    color: string;
    benefits: string[];
}

// 用户信息
export interface UserProfile {
    id: number;
    username: string;
    nickname: string;
    avatar: string;
    phone: string;
    email: string;
    memberLevel: MemberLevel;
    points: number;
    balance: number;
    totalOrders: number;
    totalAmount: number;
    registerTime: string;
    lastLoginTime: string;
    isVip: boolean;
    vipExpireTime: string;
}

// 会员信息
export interface MemberInfo {
    currentLevel: MemberLevel;
    nextLevel: MemberLevel | null;
    points: number;
    pointsToNext: number;
    benefits: string[];
    growthValue: number;
    annualSpending: number;
}

// 优惠券类型
export interface CouponType {
    type: string;
    name: string;
    icon: string;
}

// 优惠券信息
export interface Coupon {
    id: number;
    name: string;
    type: CouponType;
    value: number;
    minAmount: number;
    startTime: string;
    endTime: string;
    status: "unused" | "used" | "expired";
    description: string;
    scope: string;
}

// 充值卡信息
export interface RechargeCard {
    id: number;
    name: string;
    faceValue: number;
    actualPrice: number;
    discount: string;
    validDays: number;
    description: string;
    isHot: boolean;
    stock: number;
}

// SVIP信息
export interface SvipInfo {
    isVip: boolean;
    vipLevel: string;
    expireTime: string;
    privileges: string[];
    monthlyPrice: number;
    yearlyPrice: number;
    yearlyDiscount: string;
}

// 获取优惠券参数
export interface GetCouponsParams {
    status?: "all" | "unused" | "used" | "expired";
}

// 领取优惠券参数
export interface ClaimCouponParams {
    couponId: number;
}

// 购买充值卡参数
export interface BuyRechargeCardParams {
    cardId: number;
    quantity?: number;
}

// 开通SVIP参数
export interface SubscribeSvipParams {
    plan: "monthly" | "yearly";
}

// 获取用户信息
export function getUserProfile() {
    return get<UserProfile>("/user/profile");
}

// 获取会员信息
export function getMemberInfo() {
    return get<MemberInfo>("/user/member");
}

// 获取优惠券列表
export function getCoupons(params: GetCouponsParams = {}) {
    return post<{
        total: number;
        list: Coupon[];
    }>("/user/coupons", params);
}

// 领取优惠券
export function claimCoupon(params: ClaimCouponParams) {
    return post<{
        couponId: number;
        claimTime: string;
    }>("/user/coupon/claim", params);
}

// 获取充值卡列表
export function getRechargeCards() {
    return get<RechargeCard[]>("/user/recharge-cards");
}

// 购买充值卡
export function buyRechargeCard(params: BuyRechargeCardParams) {
    return post<{
        orderId: string;
        cardId: number;
        quantity: number;
        totalAmount: number;
        payTime: string;
    }>("/user/recharge-card/buy", params);
}

// 获取SVIP信息
export function getSvipInfo() {
    return get<SvipInfo>("/user/svip");
}

// 开通SVIP
export function subscribeSvip(params: SubscribeSvipParams) {
    return post<{
        orderId: string;
        plan: string;
        price: number;
        duration: number;
        startTime: string;
        expireTime: string;
    }>("/user/svip/subscribe", params);
}
