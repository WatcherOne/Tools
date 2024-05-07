<script setup lang="ts">
import WatHeader from './header.vue'
import WatAside from './aside.vue'
import WatToolsTop from './toolsTop.vue'

const { isNavigation, isOverflow } = useRouteMeta()
</script>

<template>
    <el-container class="wat-layout">
        <el-header>
            <wat-header></wat-header>
        </el-header>
        <el-container class="wat-bottom-container">
            <el-aside v-if="isNavigation" width="200px" class="hidden-xs-only">
                <wat-aside></wat-aside>
            </el-aside>
            <el-main class="wat-main">
                <div v-if="isNavigation" class="wat-navigation">
                    <router-view v-slot="{ Component }">
                        <component :is="Component"></component>
                    </router-view>
                </div>
                <el-row v-else :class="['wat-content', { 'wat-overflow-content': isOverflow }]">
                    <el-col
                        :xs="22"
                        :sm="18"
                        :md="16"
                        :lg="14">
                        <wat-tools-top></wat-tools-top>
                        <router-view v-slot="{ Component }">
                            <component :is="Component"></component>
                        </router-view>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="less" scoped>
.wat-layout {
    height: 100%;
    .el-header {
        background-color: #2B9A65;
        padding: 0;
    }
    .wat-bottom-container {
        height: calc(100% - 60px);
        .wat-main {
            height: 100%;
            background-color: #F8F8F8;
            overflow: auto;
            padding: 20px 0;
            .wat-navigation {
                padding: 0 20px;
            }
            .wat-content {
                justify-content: center;
                margin: 0 auto;
            }
            .wat-overflow-content {
                height: 100%;
                .el-col {
                    height: 100%;
                    .wat-card {
                        height: calc(100% - 88.5px);
                        &:deep(.el-card__body) {
                            height: calc(100% - 40px);
                        }
                    }
                }
            }
        }
    }
}
</style>
