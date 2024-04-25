<script setup lang="ts">
const { name, meta } = useRoute()

// Todo name to Localstorage
console.log(name)
</script>

<template>
    <div class="wat-tools-top">
        <div class="section">
            <div class="title">{{ meta?.title }}</div>
            <el-tooltip
                effect="dark"
                :content="$t('collection.join')"
                placement="top">
                <el-icon :size="40"><i-ep-house /></el-icon>
            </el-tooltip>
        </div>
        <div class="description">{{ meta?.description }}</div>
    </div>
</template>

<style lang="less" scoped>
.wat-tools-top {
    margin-bottom: 15px;
    .section {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 5px;
        border-bottom: 2px solid #dedede;
        margin-bottom: 10px;
        .title {
            font-size: 40px;
            color: #222;
        }
    }
    .description {
        font-size: 14px;
        color: #666;
    }
}
</style>
