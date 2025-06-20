<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const phone = ref("");
const verificationCode = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const step = ref(1); // 1: 输入手机号和验证码, 2: 设置新密码

// 发送验证码
const sendCode = () => {
    if (!phone.value) {
        alert("请输入手机号");
        return;
    }
    alert("验证码发送功能开发中...");
};

// 验证手机号和验证码
const verifyPhone = () => {
    if (!phone.value || !verificationCode.value) {
        alert("请输入手机号和验证码");
        return;
    }
    // 这里应该调用API验证手机号和验证码，目前模拟成功
    step.value = 2;
};

// 重置密码
const resetPassword = async () => {
    if (!newPassword.value || !confirmPassword.value) {
        alert("请输入新密码");
        return;
    }

    if (newPassword.value !== confirmPassword.value) {
        alert("两次输入的密码不一致");
        return;
    }

    loading.value = true;
    try {
        // 这里应该调用重置密码API，目前模拟成功
        alert("密码重置成功，请登录");
        router.push("/login");
    } catch (error) {
        console.error("重置密码出错", error);
        alert("重置密码失败，请稍后再试");
    } finally {
        loading.value = false;
    }
};

// 返回登录页
const goToLogin = () => {
    router.push("/login");
};
</script>

<template>
    <div class="forgot-password-page">
        <!-- Logo和标题 -->
        <div class="logo-container">
            <img src="@/assets/vue.svg" alt="平台" class="logo" />
            <h1 class="app-name">平台</h1>
        </div>

        <!-- 忘记密码表单 -->
        <div class="forgot-password-form">
            <!-- 步骤1：输入手机号和验证码 -->
            <div v-if="step === 1">
                <div class="form-item">
                    <input v-model="phone" type="text" placeholder="请输入手机号" />
                </div>
                <div class="form-item verification-code">
                    <input v-model="verificationCode" type="text" placeholder="请输入验证码" />
                    <button class="code-button" @click="sendCode">获取验证码</button>
                </div>
                <button class="reset-button" @click="verifyPhone">下一步</button>
            </div>

            <!-- 步骤2：设置新密码 -->
            <div v-if="step === 2">
                <div class="form-item">
                    <input v-model="newPassword" type="password" placeholder="请输入新密码" />
                </div>
                <div class="form-item">
                    <input v-model="confirmPassword" type="password" placeholder="请确认新密码" />
                </div>
                <button class="reset-button" @click="resetPassword" :disabled="loading">
                    {{ loading ? "重置中..." : "重置密码" }}
                </button>
            </div>

            <div class="login-link" @click="goToLogin">返回登录</div>
        </div>
    </div>
</template>

<style scoped>
.forgot-password-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #ffffff;
}

.logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
}

.logo {
    width: 120px;
    height: 120px;
    border-radius: 20px;
}

.app-name {
    font-size: 28px;
    font-weight: bold;
    margin-top: 20px;
    color: #000;
}

.forgot-password-form {
    width: 100%;
    max-width: 320px;
    margin-bottom: 30px;
}

.form-item {
    margin-bottom: 15px;
}

.verification-code {
    display: flex;
    gap: 10px;
}

.code-button {
    padding: 0 15px;
    border: 1px solid #07c160;
    border-radius: 8px;
    background-color: white;
    color: #07c160;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
}

input {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
    box-sizing: border-box;
}

.reset-button {
    width: 100%;
    padding: 12px 15px;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    font-weight: bold;
    background-color: #07c160;
    color: white;
    cursor: pointer;
    margin-bottom: 15px;
}

.login-link {
    text-align: center;
    color: #07c160;
    margin-top: 15px;
    font-size: 14px;
    cursor: pointer;
}
</style>
