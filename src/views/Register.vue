<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";

const router = useRouter();
const userStore = useUserStore();

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const phone = ref("");
const verificationCode = ref("");
const loading = ref(false);
const isAgree = ref(false);

// 发送验证码
const sendCode = () => {
    if (!phone.value) {
        alert("请输入手机号");
        return;
    }
    alert("验证码发送功能开发中...");
};

// 注册方法
const handleRegister = async () => {
    if (!username.value || !password.value || !confirmPassword.value || !phone.value || !verificationCode.value) {
        alert("请填写完整信息");
        return;
    }

    if (password.value !== confirmPassword.value) {
        alert("两次输入的密码不一致");
        return;
    }

    if (!isAgree.value) {
        alert("请同意用户协议和隐私政策");
        return;
    }

    loading.value = true;
    try {
        // 这里应该调用注册API，目前模拟成功
        alert("注册成功，请登录");
        router.push("/login");
    } catch (error) {
        console.error("注册出错", error);
        alert("注册失败，请稍后再试");
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
    <div class="register-page">
        <!-- Logo和标题 -->
        <div class="logo-container">
            <img src="@/assets/vue.svg" alt="平台" class="logo" />
            <h1 class="app-name">平台</h1>
        </div>

        <!-- 注册表单 -->
        <div class="register-form">
            <div class="form-item">
                <input v-model="username" type="text" placeholder="请输入用户名" />
            </div>
            <div class="form-item">
                <input v-model="password" type="password" placeholder="请输入密码" />
            </div>
            <div class="form-item">
                <input v-model="confirmPassword" type="password" placeholder="请确认密码" />
            </div>
            <div class="form-item">
                <input v-model="phone" type="text" placeholder="请输入手机号" />
            </div>
            <div class="form-item verification-code">
                <input v-model="verificationCode" type="text" placeholder="请输入验证码" />
                <button class="code-button" @click="sendCode">获取验证码</button>
            </div>
            <button class="register-button" @click="handleRegister" :disabled="loading">
                {{ loading ? "注册中..." : "注册" }}
            </button>
            <div class="login-link" @click="goToLogin">已有账号？立即登录</div>
        </div>

        <!-- 协议同意 -->
        <div class="agreement">
            <label class="checkbox-container">
                <input type="checkbox" v-model="isAgree" />
                <span class="checkmark"></span>
            </label>
            <span class="agreement-text">
                同意
                <a href="#">《用户服务协议》</a>、 <a href="#">《隐私政策》</a>和
                <a href="#">《儿童隐私政策》</a>
            </span>
        </div>
    </div>
</template>

<style scoped>
.register-page {
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

.register-form {
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

.register-button {
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

.agreement {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #666;
    margin-top: 20px;
}

.checkbox-container {
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    margin-right: 5px;
}

.checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    border: 1px solid #ddd;
    border-radius: 50%;
}

.checkbox-container input:checked ~ .checkmark {
    background-color: #07c160;
    border-color: #07c160;
}

.agreement-text a {
    color: #07c160;
    text-decoration: none;
}
</style>
