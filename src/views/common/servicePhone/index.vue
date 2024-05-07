<script setup lang="ts">
import { CommonService, HotelPhone, BankPhone, TakeoutPhone, DeliveryPhone } from './phone'
import RenderItem from './renderItem.vue'
</script>

<template>
    <!-- <el-card class=" wat-card"> -->
        <el-tabs type="border-card" class="wat-common-service-phone">
            <el-tab-pane label="公共服务">
                <render-item :list="CommonService"></render-item>
            </el-tab-pane>
            <el-tab-pane label="酒店">
                <render-item :list="HotelPhone"></render-item>
            </el-tab-pane>
            <el-tab-pane label="银行">
                <render-item :list="BankPhone"></render-item>
            </el-tab-pane>
            <el-tab-pane label="外卖送餐">
                <render-item :list="TakeoutPhone"></render-item>
            </el-tab-pane>
            <el-tab-pane label="快递物流">
                <render-item :list="DeliveryPhone"></render-item>
            </el-tab-pane>
        </el-tabs>
    <!-- </el-card> -->
</template>

<style lang="less" scoped>
.wat-common-service-phone.el-tabs {
    height: calc(100% - 88.5px);
    &:deep(.el-tabs__content) {
        height: calc(100% - 70px);
        .el-tab-pane {
            height: 100%;
        }
    }
}
</style>
