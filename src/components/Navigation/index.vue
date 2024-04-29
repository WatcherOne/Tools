<script setup lang="ts">
import { MenuItem } from '@/types/menu'

interface NavigationProps {
    title?: string
    toolList?: MenuItem[]
}

const { title, toolList } = defineProps<NavigationProps>()
</script>

<template>
    <div class="wat-navigation-section">
        <div class="wat-navigation-header">
            <span>{{ title }}</span>
        </div>
        <el-row :gutter="15">
            <navigation-card :list="toolList"></navigation-card>
        </el-row>
    </div>
</template>

<style lang="less" scoped>
.wat-navigation-section {
    .wat-navigation-header {
        border-bottom: 1px solid #dedede;
        padding: 0 10px 5px;
        margin-bottom: 15px;
        font-size: 20px;
        font-weight: bold;
    }
}    
</style>
