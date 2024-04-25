<script setup lang="ts">
import WatHeader from './header.vue'
import WatAside from './aside.vue'
import WatToolsTop from './toolsTop.vue'
</script>

<template>
    <el-container class="wat-layout">
        <el-header>
            <wat-header></wat-header>
        </el-header>
        <el-container class="wat-bottom-container">
            <el-aside width="200px">
                <wat-aside></wat-aside>
            </el-aside>
            <el-main class="wat-main">
                <div class="wat-content">
                    <wat-tools-top></wat-tools-top>
                    <router-view v-slot="{ Component }">
                        <component :is="Component"></component>
                    </router-view>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="less" scoped>
.wat-layout {
    height: 100%;
    .wat-bottom-container {
        height: calc(100% - 60px);
        .wat-main {
            height: 100%;
            background-color: #F1F5F8;
            overflow: auto;
            .wat-content {
                max-width: 600px;
                margin: 0 auto;
            }
        }
    }
}
</style>
