<script setup lang="ts">
import { useUserStore } from "@/store/user";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const username = ref("admin");
const password = ref("123456");
const loading = ref(false);
const isAgree = ref(false);
const loginType = ref("phone"); // 'phone', 'wechat', 'qq', 'apple'

// 获取重定向地址
const redirect = ref((route.query?.redirect as string) || "/");

// 登录方法
const handleLogin = async () => {
    if (!username.value || !password.value) {
        alert("请输入用户名和密码");
        return;
    }

    if (!isAgree.value) {
        alert("请同意用户协议和隐私政策");
        return;
    }

    loading.value = true;
    try {
        const success = await userStore.login({
            username: username.value,
            password: password.value,
        });

        if (success) {
            router.push(redirect.value);
        } else {
            alert("登录失败，请检查用户名和密码");
        }
    } catch (error) {
        console.error("登录出错", error);
        alert("登录失败，请稍后再试");
    } finally {
        loading.value = false;
    }
};

// 第三方登录方法
const handleThirdPartyLogin = (type: string) => {
    alert(`${type}登录功能开发中...`);
};

// 手机号登录
const handlePhoneLogin = () => {
    alert("手机号登录功能开发中...");
};

// 跳转到注册页面
const goToRegister = () => {
    router.push("/register");
};

// 跳转到忘记密码页面
const goToForgotPassword = () => {
    router.push("/forgot-password");
};
</script>

<template>
    <div class="login-page">
        <!-- Logo和标题 -->
        <div class="logo-container">
            <img src="@/assets/vue.svg" alt="平台" class="logo" />
            <h1 class="app-name">平台</h1>
        </div>

        <!-- 登录表单 -->
        <div class="login-form">
            <!-- 手机号登录 -->
            <div v-if="loginType === 'phone'">
                <div class="form-item">
                    <input v-model="username" type="text" placeholder="请输入手机号" />
                </div>
                <div class="form-item">
                    <input v-model="password" type="password" placeholder="请输入密码" />
                </div>
                <div class="form-options">
                    <span class="register-link" @click="goToRegister">注册账号</span>
                    <span class="forgot-password-link" @click="goToForgotPassword">忘记密码？</span>
                </div>
                <button class="login-button" @click="handleLogin" :disabled="loading">
                    {{ loading ? "登录中..." : "登录" }}
                </button>
            </div>
        </div>

        <!-- 第三方登录选项 -->
        <div class="third-party-login">
            <!-- 微信登录 -->
            <div class="login-button wechat-login" @click="handleThirdPartyLogin('微信')">
                <i class="wechat-icon"></i>
                <span>微信登录</span>
            </div>

            <!-- QQ登录 -->
            <div class="login-button qq-login" @click="handleThirdPartyLogin('QQ')">
                <i class="qq-icon"></i>
                <span>QQ登录</span>
            </div>

            <!-- 苹果登录 -->
            <div class="login-button apple-login" @click="handleThirdPartyLogin('苹果')">
                <i class="apple-icon"></i>
                <span>苹果登录</span>
            </div>

            <!-- 手机号登录 -->
            <div class="phone-login" @click="handlePhoneLogin">手机号登录</div>
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
.login-page {
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

.login-form {
    width: 100%;
    max-width: 320px;
    margin-bottom: 30px;
}

.form-item {
    margin-bottom: 15px;
}

.form-options {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 14px;
}

.register-link,
.forgot-password-link {
    color: #07c160;
    cursor: pointer;
}

input {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
    box-sizing: border-box;
}

.login-button {
    width: 100%;
    padding: 12px 15px;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
}

.wechat-login {
    background-color: #07c160;
    color: white;
}

.qq-login {
    background-color: #12b7f5;
    color: white;
}

.apple-login {
    background-color: #000;
    color: white;
}

.third-party-login {
    width: 100%;
    max-width: 320px;
    margin-bottom: 30px;
}

.phone-login {
    text-align: center;
    color: #666;
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
