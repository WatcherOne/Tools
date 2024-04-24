<script setup lang="ts">
import WatHeader from './header.vue'
import WatAside from './aside.vue'
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <wat-header></wat-header>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <wat-aside></wat-aside>
                </el-aside>
                <el-main class="wat-main">
                    <div class="wat-tools-top"></div>
                    <router-view v-slot="{ Component }">
                        <component :is="Component"></component>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style>
.wat-main {
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
