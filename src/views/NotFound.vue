<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
    router.push("/");
};
</script>

<template>
    <div class="not-found">
        <h1>404</h1>
        <p>抱歉，您访问的页面不存在</p>
        <button @click="goHome">返回首页</button>
    </div>
</template>

<style scoped>
.not-found {
    text-align: center;
    padding: 50px 20px;
}

h1 {
    font-size: 72px;
    margin-bottom: 20px;
    color: #f5222d;
}

p {
    font-size: 18px;
    color: #666;
    margin-bottom: 30px;
}

button {
    background-color: #1890ff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}
</style>
