<script setup lang="ts">
const router = useRouter()

const searchKeywords = ref('')

const linkToHome = () => {
    router.push('/home')
}
</script>

<template>
    <div class="wat-header">
        <div class="header-title"></div>
        <el-button circle>
            <template #icon>
                <el-icon :size="18">
                    <i-ep-operation />
                </el-icon>
            </template>
        </el-button>
        <el-button circle @click="linkToHome">
            <template #icon>
                <el-icon :size="18">
                    <i-ep-home-filled />
                </el-icon>
            </template>
        </el-button>
        <div class="search-bar">
            <el-input
                v-model="searchKeywords"
                :placeholder="`${$t('tips.please')}${$t('tips.input')} (${$t('tips.searchTips')})`">
                <template #prepend>{{ $t('menu.searchTitle') }}</template>
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
    padding-right: 15px;
    .header-title {
        width: 200px;
    }
    .search-bar {
        flex: 1;
        margin: 0 5px 0 20px;
        .el-input :deep(.el-input__wrapper:hover) {
            box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;
        }
    }
    .el-button {
        border-width: 0;
        &:hover {
            color: #2B9A65;
        }
    }
}
</style>
