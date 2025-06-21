<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getExpressList } from "@/api/express";
import { getPromoCards, getNotifications } from "@/api/promotion";
import { getUserProfile } from "@/api/user";
import type { ExpressInfo } from "@/api/express";
import type { PromoCard, Notification } from "@/api/promotion";
import type { UserProfile } from "@/api/user";

// 响应式数据
const packageInfo = ref<ExpressInfo | null>(null);
const promoCards = ref<PromoCard[]>([]);
const notifications = ref<Notification[]>([]);
const userInfo = ref<UserProfile | null>(null);
const searchQuery = ref("");
const loading = ref(false);

// 获取快递信息
const fetchExpressInfo = async () => {
    try {
        const result = await getExpressList();
        if (result.list && result.list.length > 0) {
            // 取第一个快递作为展示
            packageInfo.value = result.list[0];
        }
    } catch (error) {
        console.error("获取快递信息失败:", error);
    }
};

// 获取促销卡片
const fetchPromoCards = async () => {
    try {
        const cards = await getPromoCards();
        promoCards.value = cards.slice(0, 4); // 只取前4个
    } catch (error) {
        console.error("获取促销卡片失败:", error);
    }
};

// 获取通知消息
const fetchNotifications = async () => {
    try {
        const result = await getNotifications({ page: 1, pageSize: 1 });
        if (result.list && result.list.length > 0) {
            notifications.value = result.list;
        }
    } catch (error) {
        console.error("获取通知消息失败:", error);
    }
};

// 获取用户信息
const fetchUserInfo = async () => {
    try {
        const user = await getUserProfile();
        userInfo.value = user;
    } catch (error) {
        console.error("获取用户信息失败:", error);
    }
};

// 搜索快递
const handleSearch = async () => {
    if (!searchQuery.value.trim()) {
        alert("请输入运单号");
        return;
    }

    loading.value = true;
    try {
        // 这里可以调用查询接口
        console.log("搜索运单号:", searchQuery.value);
        alert("搜索功能开发中...");
    } catch (error) {
        console.error("搜索失败:", error);
        alert("搜索失败，请稍后再试");
    } finally {
        loading.value = false;
    }
};

// 页面加载时获取数据
onMounted(async () => {
    await Promise.all([fetchExpressInfo(), fetchPromoCards(), fetchNotifications(), fetchUserInfo()]);
});
</script>

<template>
    <div class="app-container">
        <!-- 顶部导航栏 -->
        <div class="header">
            <div class="status-bar">
                <div class="time">8:44</div>
                <div class="status-icons">
                    <i class="icon-signal"></i>
                    <i class="icon-wifi"></i>
                    <i class="icon-battery"></i>
                </div>
            </div>

            <div class="nav-bar">
                <div class="back-button">
                    <i class="icon-back"></i>
                    微信
                </div>
                <div class="profile">
                    <div class="avatar">
                        <img v-if="userInfo?.avatar" :src="userInfo.avatar" alt="头像" />
                        <svg-icon v-else name="user" color="#fff" :size="20" />
                    </div>
                    <div class="user-tag">{{ userInfo?.memberLevel?.name || "普通" }}</div>
                </div>
            </div>

            <!-- 搜索框 -->
            <div class="search-bar" @click="handleSearch">
                <svg-icon name="search" color="#fff" :size="18" />
                <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="输入运单号查询"
                    @keyup.enter="handleSearch"
                    :disabled="loading"
                />
            </div>
        </div>

        <!-- 快捷功能区 -->
        <div class="quick-actions">
            <div class="action-item">
                <div class="action-icon">
                    <svg-icon name="package" color="#fff" :size="24" />
                </div>
                <div class="action-text">快速寄件</div>
            </div>
            <div class="action-item">
                <div class="action-icon">
                    <svg-icon name="scan" color="#fff" :size="24" />
                </div>
                <div class="action-text">扫一扫</div>
                <div class="action-badge">可开手单！</div>
            </div>
            <div class="action-item">
                <div class="action-icon">
                    <i class="icon-member"></i>
                </div>
                <div class="action-text">会员中心</div>
            </div>
            <div class="action-item">
                <div class="action-icon">
                    <i class="icon-coupon"></i>
                </div>
                <div class="action-text">优惠券</div>
            </div>
        </div>

        <!-- 服务菜单 -->
        <div class="service-menu">
            <div class="menu-item">
                <div class="menu-icon">
                    <i class="icon-invoice"></i>
                </div>
                <div class="menu-text">发票管理</div>
            </div>
            <div class="menu-item">
                <div class="menu-icon">
                    <i class="icon-service"></i>
                </div>
                <div class="menu-text">在线客服</div>
            </div>
            <div class="menu-item">
                <div class="menu-icon">
                    <i class="icon-time"></i>
                </div>
                <div class="menu-text">运费时效</div>
            </div>
            <div class="menu-item">
                <div class="menu-icon">
                    <i class="icon-recharge"></i>
                </div>
                <div class="menu-text">优惠充值卡</div>
            </div>
            <div class="menu-item">
                <div class="menu-icon">
                    <i class="icon-vip"></i>
                </div>
                <div class="menu-text">SVIP会员</div>
            </div>
            <div class="menu-item">
                <div class="menu-icon">
                    <i class="icon-gift"></i>
                </div>
                <div class="menu-text">寄件返礼</div>
            </div>
            <div class="menu-item">
                <div class="menu-icon">
                    <i class="icon-location"></i>
                </div>
                <div class="menu-text">同城跑腿</div>
            </div>
            <div class="menu-item">
                <div class="menu-icon">
                    <i class="icon-phone"></i>
                </div>
                <div class="menu-text">手机回收</div>
            </div>
            <div class="menu-item">
                <div class="menu-icon">
                    <i class="icon-clothes"></i>
                </div>
                <div class="menu-text">旧衣回收</div>
                <div class="menu-badge">NEW</div>
            </div>
            <div class="menu-item">
                <div class="menu-icon">
                    <i class="icon-more"></i>
                </div>
                <div class="menu-text">更多</div>
            </div>
        </div>

        <!-- 分页指示器 -->
        <div class="pagination">
            <div class="dot active"></div>
            <div class="dot"></div>
        </div>

        <!-- 通知栏 -->
        <div v-if="notifications.length > 0" class="notification">
            <div class="notification-icon">{{ notifications[0].type.name }}</div>
            <div class="notification-text">{{ notifications[0].content }}</div>
            <div class="notification-close">×</div>
        </div>

        <!-- 促销区域 -->
        <div class="promo-area">
            <div
                v-for="(card, index) in promoCards"
                :key="card.id"
                :class="['promo-card', index === 0 ? 'large' : 'small']"
                :style="{ backgroundColor: card.backgroundColor, color: card.textColor }"
            >
                <div class="promo-title">{{ card.title }}</div>
                <div class="promo-subtitle">{{ card.subtitle }}</div>
                <button v-if="index === 0" class="promo-button">{{ card.buttonText }}</button>
                <div class="promo-image" :style="{ backgroundImage: `url(${card.image})` }"></div>
            </div>
        </div>

        <!-- 快件信息 -->
        <div v-if="packageInfo" class="package-info">
            <div class="info-header">快件信息</div>
            <div class="tracking-number">
                运单号：{{ packageInfo.trackingNumber }}
                <i class="icon-copy"></i>
            </div>
            <div class="delivery-status">
                <div class="location">
                    <div class="city">{{ packageInfo.from.city }}</div>
                    <div class="name">{{ packageInfo.from.name }}</div>
                </div>
                <div class="status-line">
                    <div class="status-text">{{ packageInfo.status }}</div>
                </div>
                <div class="location">
                    <div class="city">{{ packageInfo.to.city }}</div>
                    <div class="name">{{ packageInfo.to.name }}</div>
                </div>
            </div>
        </div>

        <!-- 无快件信息时的占位 -->
        <div v-else class="package-info">
            <div class="info-header">快件信息</div>
            <div class="no-package">
                <p>暂无快件信息</p>
                <p>请先寄件或查询快递</p>
            </div>
        </div>

        <!-- 底部导航 -->
        <div class="bottom-nav">
            <div class="nav-item active">
                <svg-icon name="home" color="#ff5a43" :size="24" />
                <div>主页</div>
            </div>
            <div class="nav-item">
                <svg-icon name="search" color="#999" :size="24" />
                <div>查快递</div>
            </div>
            <div class="nav-item">
                <div class="nav-special">
                    <svg-icon name="send" color="#fff" :size="24" />
                </div>
            </div>
            <div class="nav-item">
                <i class="icon-benefit"></i>
                <div>超值福利</div>
            </div>
            <div class="nav-item">
                <svg-icon name="user" color="#999" :size="24" />
                <div>我</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.app-container {
    max-width: 500px;
    margin: 0 auto;
    background-color: #f5f5f5;
    min-height: 100vh;
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* 顶部状态栏 */
.header {
    background-color: #ff5a43;
    color: white;
    padding: 10px 15px 15px;
    position: sticky;
    top: 0;
    z-index: 10;
}

.status-bar {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    font-size: 14px;
}

.status-icons {
    display: flex;
    gap: 5px;
}

.nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
}

.back-button {
    display: flex;
    align-items: center;
    font-size: 16px;
}

.profile {
    display: flex;
    align-items: center;
}

.avatar {
    width: 30px;
    height: 30px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.user-tag {
    background-color: #ffd700;
    color: #333;
    font-size: 12px;
    padding: 1px 4px;
    border-radius: 10px;
    margin-left: -5px;
    margin-top: 15px;
}

/* 搜索框 */
.search-bar {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 8px 15px;
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.search-bar input {
    background: transparent;
    border: none;
    color: white;
    flex: 1;
    margin-left: 10px;
    outline: none;
}

.search-bar input::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

/* 快捷功能区 */
.quick-actions {
    display: flex;
    justify-content: space-around;
    padding: 15px 10px;
    background-color: #ff5a43;
    color: white;
}

.action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.action-icon {
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
}

.action-text {
    font-size: 12px;
}

.action-badge {
    position: absolute;
    top: -5px;
    right: -15px;
    background-color: white;
    color: #ff5a43;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
}

/* 服务菜单 */
.service-menu {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    padding: 15px;
    background-color: white;
    border-radius: 15px 15px 0 0;
    margin-top: -10px;
}

.menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
    position: relative;
}

.menu-icon {
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    color: #333;
}

.menu-text {
    font-size: 12px;
    color: #333;
}

.menu-badge {
    position: absolute;
    top: -5px;
    right: 5px;
    background-color: #ff5a43;
    color: white;
    font-size: 10px;
    padding: 1px 5px;
    border-radius: 10px;
}

/* 分页指示器 */
.pagination {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin: 5px 0;
}

.dot {
    width: 15px;
    height: 3px;
    background-color: #ddd;
    border-radius: 3px;
}

.dot.active {
    background-color: #ff5a43;
    width: 25px;
}

/* 通知栏 */
.notification {
    display: flex;
    align-items: center;
    background-color: #fff8e1;
    padding: 10px 15px;
    margin: 10px;
    border-radius: 10px;
}

.notification-icon {
    background-color: #ff9800;
    color: white;
    padding: 3px 8px;
    border-radius: 5px;
    font-size: 12px;
    margin-right: 10px;
}

.notification-text {
    flex: 1;
    font-size: 13px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.notification-close {
    font-size: 18px;
    color: #999;
}

/* 促销区域 */
.promo-area {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 10px;
    padding: 0 10px;
}

.promo-card {
    background-color: #fff;
    border-radius: 10px;
    padding: 15px;
    position: relative;
    overflow: hidden;
}

.promo-card.large {
    grid-column: 1;
    grid-row: 1 / span 2;
    height: 200px;
}

.promo-card.small {
    height: 95px;
}

.promo-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
}

.promo-subtitle {
    font-size: 12px;
    color: #999;
    margin-top: 3px;
}

.promo-button {
    background-color: #ff9800;
    color: white;
    border: none;
    border-radius: 15px;
    padding: 5px 15px;
    font-size: 12px;
    margin-top: 10px;
}

.promo-image {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 80px;
    height: 80px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.promo-image.fruit {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FF9800"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>')
        no-repeat;
    width: 100px;
    height: 100px;
}

/* 快件信息 */
.package-info {
    background-color: white;
    margin: 15px 10px;
    border-radius: 10px;
    padding: 15px;
}

.info-header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.tracking-number {
    color: #666;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.delivery-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.location {
    text-align: center;
}

.city {
    font-size: 16px;
    font-weight: bold;
}

.name {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
}

.status-line {
    flex: 1;
    height: 2px;
    background-color: #e0e0e0;
    margin: 0 15px;
    position: relative;
}

.status-line::before,
.status-line::after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #e0e0e0;
    border-radius: 50%;
    top: -3px;
}

.status-line::before {
    left: 0;
}

.status-line::after {
    right: 0;
}

.status-text {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4caf50;
    color: white;
    padding: 2px 10px;
    border-radius: 10px;
    font-size: 12px;
}

.no-package {
    text-align: center;
    padding: 20px;
    color: #999;
}

.no-package p {
    margin: 5px 0;
    font-size: 14px;
}

/* 底部导航 */
.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 0 auto;
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    color: #999;
}

.nav-item.active {
    color: #ff5a43;
}

.nav-special {
    width: 50px;
    height: 50px;
    background-color: #ff5a43;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -25px;
    color: white;
}

/* 图标样式 */
[class^="icon-"] {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

.icon-back:before {
    content: "←";
}

.icon-search:before {
    content: "🔍";
}

.icon-user:before {
    content: "👤";
}

.icon-package:before {
    content: "📦";
}

.icon-scan:before {
    content: "📱";
}

.icon-member:before {
    content: "👑";
}

.icon-coupon:before {
    content: "🎟️";
}

.icon-invoice:before {
    content: "📄";
}

.icon-service:before {
    content: "🎧";
}

.icon-time:before {
    content: "⏱️";
}

.icon-recharge:before {
    content: "💳";
}

.icon-vip:before {
    content: "✨";
}

.icon-gift:before {
    content: "🎁";
}

.icon-location:before {
    content: "📍";
}

.icon-phone:before {
    content: "📱";
}

.icon-clothes:before {
    content: "👕";
}

.icon-more:before {
    content: "⋯";
}

.icon-copy:before {
    content: "📋";
}

.icon-home:before {
    content: "🏠";
}

.icon-search-alt:before {
    content: "🔍";
}

.icon-send:before {
    content: "📨";
}

.icon-benefit:before {
    content: "🎁";
}

.icon-me:before {
    content: "👤";
}

/* 电池、信号和WiFi图标 */
.icon-battery:before {
    content: "🔋";
}

.icon-signal:before {
    content: "📶";
}

.icon-wifi:before {
    content: "📶";
}
</style>
