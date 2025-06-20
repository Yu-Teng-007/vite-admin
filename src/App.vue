<script setup lang="ts">
// 自动导入，无需手动导入
</script>

<template>
    <router-view />
</template>

<style>
/* 全局样式 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
        "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #f5f5f5;
    height: 100%;
    width: 100%;
}

#app {
    height: 100%;
    width: 100%;
}

a {
    text-decoration: none;
    color: #1890ff;
}
</style>
