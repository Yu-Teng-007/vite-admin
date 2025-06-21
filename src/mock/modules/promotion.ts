import Mock from "mockjs";
import type { MockMethod } from "../types";

// 促销活动类型
const promotionTypes = [
    { type: "discount", name: "折扣活动", icon: "💰" },
    { type: "cashback", name: "返现活动", icon: "💸" },
    { type: "gift", name: "赠品活动", icon: "🎁" },
    { type: "free_shipping", name: "免运费", icon: "🚚" },
    { type: "points", name: "积分活动", icon: "⭐" },
];

// 通知类型
const notificationTypes = [
    { type: "system", name: "系统通知", color: "#1890ff" },
    { type: "promotion", name: "促销通知", color: "#ff4d4f" },
    { type: "logistics", name: "物流通知", color: "#52c41a" },
    { type: "service", name: "服务通知", color: "#faad14" },
];

// 生成促销卡片数据
const generatePromoCards = () => {
    const cards = [];
    const cardCount = Mock.Random.integer(4, 8);

    for (let i = 0; i < cardCount; i++) {
        cards.push({
            id: Mock.Random.increment(),
            title: Mock.mock("@ctitle(4, 8)"),
            subtitle: Mock.mock("@ctitle(6, 12)"),
            type: Mock.Random.pick(promotionTypes),
            image: Mock.mock("@image('300x200', '@color', '@ctitle(2, 4)')"),
            backgroundColor: Mock.mock("@color"),
            textColor: "#ffffff",
            buttonText: Mock.Random.pick(["立即领取", "马上参与", "查看详情", "立即使用"]),
            startTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
            endTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
            isHot: Mock.Random.boolean(),
            priority: Mock.Random.integer(1, 10),
            clickUrl: `/promotion/${Mock.Random.increment()}`,
            description: Mock.mock("@csentence(10, 30)"),
        });
    }

    return cards.sort((a: any, b: any) => b.priority - a.priority);
};

// 生成通知消息数据
const generateNotifications = () => {
    return Mock.mock({
        "notifications|5-15": [
            {
                id: "@increment",
                title: "@ctitle(8, 15)",
                content: "@csentence(20, 50)",
                type: () => Mock.Random.pick(notificationTypes),
                isRead: "@boolean",
                createTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
                priority: () => Mock.Random.pick(["low", "normal", "high"]),
                actionUrl: "/notification/@increment",
                actionText: () => Mock.Random.pick(["查看详情", "立即处理", "去看看"]),
            },
        ],
    }).notifications.sort((a: any, b: any) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime());
};

// 生成活动列表数据
const generateActivities = () => {
    return Mock.mock({
        "activities|8-20": [
            {
                id: "@increment",
                title: "@ctitle(6, 15)",
                description: "@csentence(15, 40)",
                type: () => Mock.Random.pick(promotionTypes),
                image: "@image('400x300', '@color', '@ctitle(2, 4)')",
                startTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
                endTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
                status: () => Mock.Random.pick(["upcoming", "ongoing", "ended"]),
                participantCount: "@integer(100, 10000)",
                maxParticipants: "@integer(1000, 50000)",
                rules: ["@csentence(10, 20)", "@csentence(10, 20)", "@csentence(10, 20)"],
                rewards: ["@ctitle(5, 10)", "@ctitle(5, 10)", "@ctitle(5, 10)"],
                isJoined: "@boolean",
                joinTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
                tags: ["@ctitle(2, 4)", "@ctitle(2, 4)"],
            },
        ],
    }).activities;
};

// 获取首页促销卡片
const getPromoCards = () => {
    const cards = generatePromoCards();

    return {
        code: 200,
        data: cards,
        message: "获取促销卡片成功",
    };
};

// 获取通知消息列表
const getNotifications = (config: any) => {
    const { page = 1, pageSize = 10, type = "all" } = JSON.parse(config.body || "{}");
    let notifications = generateNotifications();

    if (type !== "all") {
        notifications = notifications.filter((item: any) => item.type.type === type);
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const list = notifications.slice(start, end);

    return {
        code: 200,
        data: {
            total: notifications.length,
            page,
            pageSize,
            list,
        },
        message: "获取通知列表成功",
    };
};

// 标记通知为已读
const markNotificationRead = (config: any) => {
    const { notificationId } = JSON.parse(config.body);

    return {
        code: 200,
        data: {
            notificationId,
            readTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
        },
        message: "通知已标记为已读",
    };
};

// 获取活动列表
const getActivities = (config: any) => {
    const { page = 1, pageSize = 10, status = "all", type = "all" } = JSON.parse(config.body || "{}");
    let activities = generateActivities();

    if (status !== "all") {
        activities = activities.filter((item: any) => item.status === status);
    }

    if (type !== "all") {
        activities = activities.filter((item: any) => item.type.type === type);
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const list = activities.slice(start, end);

    return {
        code: 200,
        data: {
            total: activities.length,
            page,
            pageSize,
            list,
        },
        message: "获取活动列表成功",
    };
};

// 参与活动
const joinActivity = (config: any) => {
    const { activityId } = JSON.parse(config.body);

    return {
        code: 200,
        data: {
            activityId,
            joinTime: Mock.mock("@datetime('yyyy-MM-dd HH:mm:ss')"),
            participantNumber: Mock.Random.integer(1000, 9999),
        },
        message: "活动参与成功",
    };
};

// 获取活动详情
const getActivityDetail = (config: any) => {
    const activityId = config.url.split("/").pop();
    const activity = generateActivities()[0];
    activity.id = activityId;

    return {
        code: 200,
        data: {
            ...activity,
            detailImages: [
                "@image('600x400', '@color', '@ctitle(2, 4)')",
                "@image('600x400', '@color', '@ctitle(2, 4)')",
                "@image('600x400', '@color', '@ctitle(2, 4)')",
            ],
            faq: [
                {
                    question: "@csentence(8, 15)?",
                    answer: "@csentence(20, 50)",
                },
                {
                    question: "@csentence(8, 15)?",
                    answer: "@csentence(20, 50)",
                },
            ],
        },
        message: "获取活动详情成功",
    };
};

// 获取轮播图数据
const getBanners = () => {
    const banners = Mock.mock({
        "banners|3-6": [
            {
                id: "@increment",
                title: "@ctitle(6, 12)",
                image: "@image('750x300', '@color', '@ctitle(2, 4)')",
                linkUrl: "/banner/@increment",
                linkType: () => Mock.Random.pick(["activity", "product", "external"]),
                startTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
                endTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
                priority: "@integer(1, 10)",
                isActive: true,
            },
        ],
    }).banners.sort((a: any, b: any) => b.priority - a.priority);

    return {
        code: 200,
        data: banners,
        message: "获取轮播图成功",
    };
};

export default {
    "get|/api/promotion/cards": getPromoCards,
    "post|/api/promotion/notifications": getNotifications,
    "post|/api/promotion/notification/read": markNotificationRead,
    "post|/api/promotion/activities": getActivities,
    "post|/api/promotion/activity/join": joinActivity,
    "get|/api/promotion/activity/(.*)": getActivityDetail,
    "get|/api/promotion/banners": getBanners,
} as MockMethod;
