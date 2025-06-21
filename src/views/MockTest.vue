<template>
    <div class="mock-test">
        <h1>Mock数据测试页面</h1>
        
        <div class="test-section">
            <h2>快递相关接口测试</h2>
            <button @click="testExpress">测试快递列表</button>
            <button @click="testExpressQuery">测试快递查询</button>
            <pre v-if="expressResult">{{ JSON.stringify(expressResult, null, 2) }}</pre>
        </div>

        <div class="test-section">
            <h2>用户相关接口测试</h2>
            <button @click="testUser">测试用户信息</button>
            <button @click="testCoupons">测试优惠券</button>
            <pre v-if="userResult">{{ JSON.stringify(userResult, null, 2) }}</pre>
        </div>

        <div class="test-section">
            <h2>促销相关接口测试</h2>
            <button @click="testPromotion">测试促销卡片</button>
            <button @click="testNotifications">测试通知消息</button>
            <pre v-if="promotionResult">{{ JSON.stringify(promotionResult, null, 2) }}</pre>
        </div>

        <div class="test-section">
            <h2>服务相关接口测试</h2>
            <button @click="testService">测试发票列表</button>
            <button @click="testChat">测试客服会话</button>
            <pre v-if="serviceResult">{{ JSON.stringify(serviceResult, null, 2) }}</pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getExpressList, queryExpress } from "@/api/express";
import { getUserProfile, getCoupons } from "@/api/user";
import { getPromoCards, getNotifications } from "@/api/promotion";
import { getInvoices, startChat } from "@/api/service";

const expressResult = ref(null);
const userResult = ref(null);
const promotionResult = ref(null);
const serviceResult = ref(null);

const testExpress = async () => {
    try {
        const result = await getExpressList();
        expressResult.value = result;
    } catch (error) {
        expressResult.value = { error: error.message };
    }
};

const testExpressQuery = async () => {
    try {
        const result = await queryExpress({ trackingNumber: "SF1234567890123" });
        expressResult.value = result;
    } catch (error) {
        expressResult.value = { error: error.message };
    }
};

const testUser = async () => {
    try {
        const result = await getUserProfile();
        userResult.value = result;
    } catch (error) {
        userResult.value = { error: error.message };
    }
};

const testCoupons = async () => {
    try {
        const result = await getCoupons();
        userResult.value = result;
    } catch (error) {
        userResult.value = { error: error.message };
    }
};

const testPromotion = async () => {
    try {
        const result = await getPromoCards();
        promotionResult.value = result;
    } catch (error) {
        promotionResult.value = { error: error.message };
    }
};

const testNotifications = async () => {
    try {
        const result = await getNotifications();
        promotionResult.value = result;
    } catch (error) {
        promotionResult.value = { error: error.message };
    }
};

const testService = async () => {
    try {
        const result = await getInvoices();
        serviceResult.value = result;
    } catch (error) {
        serviceResult.value = { error: error.message };
    }
};

const testChat = async () => {
    try {
        const result = await startChat();
        serviceResult.value = result;
    } catch (error) {
        serviceResult.value = { error: error.message };
    }
};
</script>

<style scoped>
.mock-test {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.test-section {
    margin-bottom: 30px;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
}

.test-section h2 {
    margin-bottom: 15px;
    color: #333;
}

button {
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 8px 16px;
    background-color: #1890ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #40a9ff;
}

pre {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 4px;
    overflow-x: auto;
    margin-top: 15px;
    font-size: 12px;
    line-height: 1.4;
}
</style>
