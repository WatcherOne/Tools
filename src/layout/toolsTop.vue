<script setup lang="ts">
const { path, parentPath, i18Key } = useRouteMeta()
</script>

<template>
    <div class="wat-tools-top">
        <div class="section">
            <div class="title">{{ $t(`${i18Key}.title`) }}</div>
            <favorite-button :item="{ path, parentPath }"></favorite-button>  
        </div>
        <div class="description">{{ $t(`${i18Key}.description`) }}</div>
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
            font-size: 26px;
            color: #222;
        }
    }
    .description {
        font-size: 14px;
        color: #666;
    }
}
</style>
