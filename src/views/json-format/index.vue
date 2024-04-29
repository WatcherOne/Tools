<script setup lang="ts">
import { isJSON } from '@/utils/common.ts'

const input = ref('')
const showError = ref(false)
const jsonData = computed(() => {
    if (isJSON(input.value)) {
        showError.value = false
        return JSON.parse(input.value)
    }
    showError.value = input.value ? true : false
    return {}
})
</script>

<template>
    <el-card class="wat-token-create wat-card">
        <el-form>
            <el-collapse accordion>
                <el-collapse-item name="1">
                    <template #title>
                        <span v-show="showError" class="status-error">JSON格式数据有问题, 请确认数据</span>
                    </template>
                    <el-form-item>
                        <el-input type="textarea" v-model="input" :rows="8"></el-input>        
                    </el-form-item>
                </el-collapse-item>
            </el-collapse>
            <el-form-item>
                <json-viewer :value="jsonData"></json-viewer>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<style lang="less" scoped>
.el-collapse {
    margin-bottom: 15px;
    .el-collapse-item {
        :deep(.el-collapse-item__header) {
            padding-left: 12px;
            border-left: 1px solid var(--el-collapse-border-color);
            border-right: 1px solid var(--el-collapse-border-color);
            &.is-active {
                border-bottom: 1px solid var(--el-collapse-border-color);
            }
        }
        :deep(.el-collapse-item__wrap) {
            padding: 15px 15px 0;
            border-left: 1px solid var(--el-collapse-border-color);
            border-right: 1px solid var(--el-collapse-border-color);
            .el-collapse-item__content {
                padding-bottom: 0;
            }
        }
    }
}
</style>
