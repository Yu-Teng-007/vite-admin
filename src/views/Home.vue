<script setup lang="ts">
// 由于配置了自动导入，不需要手动导入 ref, reactive 等
const count = ref(0);

const increment = () => {
    count.value++;
};
</script>

<template>
    <div class="home-container">
        <h1>移动端管理后台</h1>
        <p>欢迎使用移动端管理后台系统</p>
        <div class="counter">
            <p>计数器: {{ count }}</p>
            <button @click="increment">增加</button>
        </div>
    </div>
</template>

<style scoped>
.home-container {
    padding: 20px;
    text-align: center;
}

.counter {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 8px;
}

button {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10px 2px;
    cursor: pointer;
    border-radius: 4px;
}
</style>
