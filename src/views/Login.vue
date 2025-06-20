<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";

const router = useRouter();
const userStore = useUserStore();

const username = ref("");
const password = ref("");
const loading = ref(false);

const login = () => {
    if (!username.value || !password.value) {
        alert("请输入用户名和密码");
        return;
    }

    loading.value = true;

    // 模拟登录请求
    setTimeout(() => {
        const token = "mock-token-" + Date.now();
        const userInfo = {
            id: 1,
            username: username.value,
            name: "管理员",
        };

        userStore.setToken(token);
        userStore.setUserInfo(userInfo);

        loading.value = false;
        router.push("/");
    }, 1000);
};
</script>

<template>
    <div class="login-container">
        <h2>登录</h2>
        <div class="login-form">
            <div class="form-item">
                <label for="username">用户名</label>
                <input id="username" v-model="username" type="text" placeholder="请输入用户名" />
            </div>
            <div class="form-item">
                <label for="password">密码</label>
                <input id="password" v-model="password" type="password" placeholder="请输入密码" />
            </div>
            <button class="login-button" @click="login" :disabled="loading">
                {{ loading ? "登录中..." : "登录" }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.login-container {
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
    margin-top: 50px;
}

.login-form {
    margin-top: 20px;
}

.form-item {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

.login-button {
    width: 100%;
    padding: 12px;
    background-color: #1890ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
}

.login-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>
