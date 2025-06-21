import { post, get } from "@/utils/request";

// 促销类型
export interface PromotionType {
    type: string;
    name: string;
    icon: string;
}

// 促销卡片
export interface PromoCard {
    id: number;
    title: string;
    subtitle: string;
    type: PromotionType;
    image: string;
    backgroundColor: string;
    textColor: string;
    buttonText: string;
    startTime: string;
    endTime: string;
    isHot: boolean;
    priority: number;
    clickUrl: string;
    description: string;
}

// 通知类型
export interface NotificationType {
    type: string;
    name: string;
    color: string;
}

// 通知消息
export interface Notification {
    id: number;
    title: string;
    content: string;
    type: NotificationType;
    isRead: boolean;
    createTime: string;
    priority: "low" | "normal" | "high";
    actionUrl: string;
    actionText: string;
}

// 活动信息
export interface Activity {
    id: number;
    title: string;
    description: string;
    type: PromotionType;
    image: string;
    startTime: string;
    endTime: string;
    status: "upcoming" | "ongoing" | "ended";
    participantCount: number;
    maxParticipants: number;
    rules: string[];
    rewards: string[];
    isJoined: boolean;
    joinTime: string;
    tags: string[];
}

// 活动详情
export interface ActivityDetail extends Activity {
    detailImages: string[];
    faq: {
        question: string;
        answer: string;
    }[];
}

// 轮播图
export interface Banner {
    id: number;
    title: string;
    image: string;
    linkUrl: string;
    linkType: "activity" | "product" | "external";
    startTime: string;
    endTime: string;
    priority: number;
    isActive: boolean;
}

// 获取通知参数
export interface GetNotificationsParams {
    page?: number;
    pageSize?: number;
    type?: string;
}

// 标记通知已读参数
export interface MarkNotificationReadParams {
    notificationId: number;
}

// 获取活动列表参数
export interface GetActivitiesParams {
    page?: number;
    pageSize?: number;
    status?: "all" | "upcoming" | "ongoing" | "ended";
    type?: string;
}

// 参与活动参数
export interface JoinActivityParams {
    activityId: number;
}

// 获取首页促销卡片
export function getPromoCards() {
    return get<PromoCard[]>("/promotion/cards");
}

// 获取通知消息列表
export function getNotifications(params: GetNotificationsParams = {}) {
    return post<{
        total: number;
        page: number;
        pageSize: number;
        list: Notification[];
    }>("/promotion/notifications", params);
}

// 标记通知为已读
export function markNotificationRead(params: MarkNotificationReadParams) {
    return post<{
        notificationId: number;
        readTime: string;
    }>("/promotion/notification/read", params);
}

// 获取活动列表
export function getActivities(params: GetActivitiesParams = {}) {
    return post<{
        total: number;
        page: number;
        pageSize: number;
        list: Activity[];
    }>("/promotion/activities", params);
}

// 参与活动
export function joinActivity(params: JoinActivityParams) {
    return post<{
        activityId: number;
        joinTime: string;
        participantNumber: number;
    }>("/promotion/activity/join", params);
}

// 获取活动详情
export function getActivityDetail(activityId: number) {
    return get<ActivityDetail>(`/promotion/activity/${activityId}`);
}

// 获取轮播图数据
export function getBanners() {
    return get<Banner[]>("/promotion/banners");
}
