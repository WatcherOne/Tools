<script setup lang="ts">
const searchKeywords = ref('')
</script>

<template>
    <div class="wat-header">
        <el-button circle>
            <template #icon>
                <el-icon :size="18">
                    <i-ep-operation />
                </el-icon>
            </template>
        </el-button>
        <el-button circle>
            <template #icon>
                <el-icon :size="18">
                    <i-ep-home-filled />
                </el-icon>
            </template>
        </el-button>
        <div class="search-bar">
            <el-input
                v-model="searchKeywords"
                placeholder="Please input">
                <template #prepend>站内搜索</template>
            </el-input>
        </div>
        <select-language></select-language>
    </div>
</template>

<style lang="less" scoped>
.wat-header {
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    box-sizing: border-box;
    padding-right: 20%;
    .search-bar {
        flex: 1;
        margin: 0 5px 0 20px;
    }
    .el-button {
        border-width: 0;
        &:hover {
            color: #2B9A65;
        }
    }
}
</style>
