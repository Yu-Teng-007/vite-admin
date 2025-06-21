import Mock from "mockjs";
import type { MockMethod } from "../types";

// 会员等级
const memberLevels = [
    { level: 1, name: "普通会员", color: "#999999", benefits: ["基础服务"] },
    { level: 2, name: "银牌会员", color: "#C0C0C0", benefits: ["基础服务", "优先客服"] },
    { level: 3, name: "金牌会员", color: "#FFD700", benefits: ["基础服务", "优先客服", "专属优惠"] },
    { level: 4, name: "钻石会员", color: "#B9F2FF", benefits: ["基础服务", "优先客服", "专属优惠", "免费保险"] },
    { level: 5, name: "SVIP会员", color: "#FF6B6B", benefits: ["全部特权", "专属客服", "免费上门取件"] },
];

// 优惠券类型
const couponTypes = [
    { type: "shipping", name: "运费券", icon: "🚚" },
    { type: "discount", name: "折扣券", icon: "💰" },
    { type: "cashback", name: "返现券", icon: "💸" },
    { type: "gift", name: "礼品券", icon: "🎁" },
];

// 生成用户信息
const generateUserInfo = () => {
    const memberLevel = Mock.Random.pick(memberLevels);
    return {
        id: Mock.Random.increment(),
        username: Mock.mock("@word(5, 10)"),
        nickname: Mock.mock("@cname"),
        avatar: Mock.mock("@image('100x100', '#4A7BF7', 'Avatar')"),
        phone: Mock.mock(/1[3-9]\d{9}/),
        email: Mock.mock("@email"),
        memberLevel: memberLevel,
        points: Mock.Random.integer(0, 10000),
        balance: Mock.Random.float(0, 1000, 2, 2),
        totalOrders: Mock.Random.integer(0, 100),
        totalAmount: Mock.Random.float(0, 10000, 2, 2),
        registerTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
        lastLoginTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
        isVip: Mock.Random.boolean(),
        vipExpireTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
    };
};

// 生成优惠券数据
const generateCoupons = () => {
    const coupons = [];
    const couponCount = Mock.Random.integer(5, 15);

    for (let i = 0; i < couponCount; i++) {
        coupons.push({
            id: Mock.Random.increment(),
            name: Mock.mock("@ctitle(5, 10)"),
            type: Mock.Random.pick(couponTypes),
            value: Mock.Random.integer(5, 100),
            minAmount: Mock.Random.integer(50, 500),
            startTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
            endTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
            status: Mock.Random.pick(["unused", "used", "expired"]),
            description: Mock.mock("@csentence(10, 30)"),
            scope: Mock.Random.pick(["全平台", "指定商品", "新用户专享"]),
        });
    }

    return coupons;
};

// 生成充值卡数据
const generateRechargeCards = () => {
    const cards = [];
    const cardCount = Mock.Random.integer(3, 8);

    for (let i = 0; i < cardCount; i++) {
        const faceValue = Mock.Random.pick([50, 100, 200, 500, 1000]);
        const actualPrice = Number((faceValue * Mock.Random.float(0.8, 0.95, 2, 2)).toFixed(2));
        const discount = (((faceValue - actualPrice) / faceValue) * 100).toFixed(1);

        cards.push({
            id: Mock.Random.increment(),
            name: Mock.mock("@ctitle(3, 8)"),
            faceValue,
            actualPrice,
            discount,
            validDays: Mock.Random.pick([30, 90, 180, 365]),
            description: Mock.mock("@csentence(10, 20)"),
            isHot: Mock.Random.boolean(),
            stock: Mock.Random.integer(0, 1000),
        });
    }

    return cards;
};

// 获取用户信息
const getUserProfile = () => {
    const userInfo = generateUserInfo();
    return {
        code: 200,
        data: userInfo,
        message: "获取用户信息成功",
    };
};

// 获取会员信息
const getMemberInfo = () => {
    const userInfo = generateUserInfo();
    const nextLevel = memberLevels.find((level) => level.level > userInfo.memberLevel.level);

    return {
        code: 200,
        data: {
            currentLevel: userInfo.memberLevel,
            nextLevel: nextLevel || null,
            points: userInfo.points,
            pointsToNext: nextLevel ? Mock.Random.integer(100, 1000) : 0,
            benefits: userInfo.memberLevel.benefits,
            growthValue: Mock.Random.integer(0, 10000),
            annualSpending: userInfo.totalAmount,
        },
        message: "获取会员信息成功",
    };
};

// 获取优惠券列表
const getCoupons = (config: any) => {
    const { status = "all" } = JSON.parse(config.body || "{}");
    let coupons = generateCoupons();

    if (status !== "all") {
        coupons = coupons.filter((coupon: any) => coupon.status === status);
    }

    return {
        code: 200,
        data: {
            total: coupons.length,
            list: coupons,
        },
        message: "获取优惠券列表成功",
    };
};

// 领取优惠券
const claimCoupon = (config: any) => {
    const { couponId } = JSON.parse(config.body);

    return {
        code: 200,
        data: {
            couponId,
            claimTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
        },
        message: "优惠券领取成功",
    };
};

// 获取充值卡列表
const getRechargeCards = () => {
    const cards = generateRechargeCards();

    return {
        code: 200,
        data: cards,
        message: "获取充值卡列表成功",
    };
};

// 购买充值卡
const buyRechargeCard = (config: any) => {
    const { cardId, quantity = 1 } = JSON.parse(config.body);

    return {
        code: 200,
        data: {
            orderId: Mock.mock("@guid"),
            cardId,
            quantity,
            totalAmount: Mock.Random.float(50, 1000, 2, 2),
            payTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
        },
        message: "充值卡购买成功",
    };
};

// 获取SVIP信息
const getSvipInfo = () => {
    return {
        code: 200,
        data: {
            isVip: Mock.Random.boolean(),
            vipLevel: "SVIP",
            expireTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
            privileges: ["免费上门取件", "专属客服通道", "运费9折优惠", "优先派送", "免费保价服务", "生日专属礼品"],
            monthlyPrice: 29.9,
            yearlyPrice: 299,
            yearlyDiscount: "买10送2",
        },
        message: "获取SVIP信息成功",
    };
};

// 开通SVIP
const subscribeSvip = (config: any) => {
    const { plan } = JSON.parse(config.body); // monthly | yearly

    const price = plan === "yearly" ? 299 : 29.9;
    const duration = plan === "yearly" ? 365 : 30;

    return {
        code: 200,
        data: {
            orderId: Mock.mock("@guid"),
            plan,
            price,
            duration,
            startTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
            expireTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
        },
        message: "SVIP开通成功",
    };
};

export default {
    "get|/api/user/profile": getUserProfile,
    "get|/api/user/member": getMemberInfo,
    "post|/api/user/coupons": getCoupons,
    "post|/api/user/coupon/claim": claimCoupon,
    "get|/api/user/recharge-cards": getRechargeCards,
    "post|/api/user/recharge-card/buy": buyRechargeCard,
    "get|/api/user/svip": getSvipInfo,
    "post|/api/user/svip/subscribe": subscribeSvip,
} as MockMethod;
