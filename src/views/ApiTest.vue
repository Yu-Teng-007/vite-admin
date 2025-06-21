<template>
    <div class="api-test-container">
        <h1>前后端连接测试</h1>

        <div class="test-section">
            <h2>服务状态</h2>
            <div class="status-info">
                <p><strong>前端服务:</strong> http://localhost:5173/</p>
                <p><strong>后端服务:</strong> http://localhost:3000/api</p>
                <p><strong>当前模式:</strong> {{ currentMode }}</p>
                <p><strong>使用 Mock:</strong> {{ useMock ? "是" : "否" }}</p>
            </div>
        </div>

        <div class="test-section">
            <h2>API 测试</h2>

            <div class="test-item">
                <h3>1. 测试快递公司列表 (GET)</h3>
                <button @click="testExpressCompanies" :disabled="loading">
                    {{ loading ? "测试中..." : "测试快递公司列表" }}
                </button>
                <div v-if="expressCompaniesResult" class="result">
                    <h4>结果:</h4>
                    <pre>{{ JSON.stringify(expressCompaniesResult, null, 2) }}</pre>
                </div>
            </div>

            <div class="test-item">
                <h3>2. 测试快递查询 (POST)</h3>
                <button @click="testExpressQuery" :disabled="loading">
                    {{ loading ? "测试中..." : "测试快递查询" }}
                </button>
                <div v-if="expressQueryResult" class="result">
                    <h4>结果:</h4>
                    <pre>{{ JSON.stringify(expressQueryResult, null, 2) }}</pre>
                </div>
            </div>

            <div class="test-item">
                <h3>3. 测试促销卡片 (GET)</h3>
                <button @click="testPromoCards" :disabled="loading">
                    {{ loading ? "测试中..." : "测试促销卡片" }}
                </button>
                <div v-if="promoCardsResult" class="result">
                    <h4>结果:</h4>
                    <pre>{{ JSON.stringify(promoCardsResult, null, 2) }}</pre>
                </div>
            </div>
        </div>

        <div class="test-section">
            <h2>切换服务模式</h2>
            <div class="switch-buttons">
                <button @click="switchToMock" :class="{ active: useMock }">切换到 Mock 模式</button>
                <button @click="switchToReal" :class="{ active: !useMock }">切换到真实后端</button>
            </div>
            <p class="switch-tip">💡 切换模式后需要刷新页面才能完全生效</p>
        </div>

        <div v-if="error" class="error">
            <h3>错误信息:</h3>
            <p>{{ error }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getExpressCompanies, queryExpress } from "@/api/express";
import { getPromoCards } from "@/api/promotion";
import { API_CONFIG, ENV_INFO } from "@/config/api";

const loading = ref(false);
const error = ref("");
const currentMode = ref("");
const useMock = ref(API_CONFIG.useMock);

const expressCompaniesResult = ref(null);
const expressQueryResult = ref(null);
const promoCardsResult = ref(null);

// 测试快递公司列表
const testExpressCompanies = async () => {
    loading.value = true;
    error.value = "";
    try {
        const result = await getExpressCompanies();
        expressCompaniesResult.value = result;
        console.log("快递公司列表测试成功:", result);
    } catch (err: any) {
        error.value = `快递公司列表测试失败: ${err.message}`;
        console.error("快递公司列表测试失败:", err);
    } finally {
        loading.value = false;
    }
};

// 测试快递查询
const testExpressQuery = async () => {
    loading.value = true;
    error.value = "";
    try {
        const result = await queryExpress({
            trackingNumber: "1234567890",
            companyCode: "sf",
        });
        expressQueryResult.value = result;
        console.log("快递查询测试成功:", result);
    } catch (err: any) {
        error.value = `快递查询测试失败: ${err.message}`;
        console.error("快递查询测试失败:", err);
    } finally {
        loading.value = false;
    }
};

// 测试促销卡片
const testPromoCards = async () => {
    loading.value = true;
    error.value = "";
    try {
        const result = await getPromoCards();
        promoCardsResult.value = result;
        console.log("促销卡片测试成功:", result);
    } catch (err: any) {
        error.value = `促销卡片测试失败: ${err.message}`;
        console.error("促销卡片测试失败:", err);
    } finally {
        loading.value = false;
    }
};

// 切换到 Mock 模式
const switchToMock = () => {
    if (typeof window !== "undefined" && (window as any).apiSwitch) {
        (window as any).apiSwitch.switchToMock();
        useMock.value = true;
    }
};

// 切换到真实后端
const switchToReal = () => {
    if (typeof window !== "undefined" && (window as any).apiSwitch) {
        (window as any).apiSwitch.switchToReal();
        useMock.value = false;
    }
};

onMounted(() => {
    currentMode.value = ENV_INFO.mode;
    console.log("API 测试页面已加载");
    console.log("当前配置:", {
        baseURL: API_CONFIG.baseURL,
        useMock: API_CONFIG.useMock,
        mode: ENV_INFO.mode,
    });
});
</script>

<style scoped>
.api-test-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.test-section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.status-info p {
    margin: 5px 0;
}

.test-item {
    margin-bottom: 20px;
    padding: 15px;
    background: #f9f9f9;
    border-radius: 5px;
}

.test-item button {
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.test-item button:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.result {
    margin-top: 10px;
    padding: 10px;
    background: #e9ecef;
    border-radius: 4px;
}

.result pre {
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.switch-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.switch-buttons button {
    padding: 8px 16px;
    border: 1px solid #007bff;
    background: white;
    color: #007bff;
    border-radius: 4px;
    cursor: pointer;
}

.switch-buttons button.active {
    background: #007bff;
    color: white;
}

.switch-tip {
    font-size: 14px;
    color: #666;
    margin: 0;
}

.error {
    padding: 15px;
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
}
</style>
