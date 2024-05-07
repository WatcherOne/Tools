<script setup lang="ts">
const { list } = defineProps<{
    list: { label: string; value: string; }[]
}>()
</script>

<template>
    <div class="list-container">
        <div v-for="(item, i) in list" :key="i" class="list-item">
            <div class="name">{{ item.label }}</div>
            <div class="code">{{ item.value }}</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.list-container {
    height: 100%;
    overflow: auto;
    .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #dedede;
        font-size: 14px;
        .name {
            color: #444;
        }
        .code {
            color: #368A6E;
            font-weight: bold;
        }
    }
}
</style>
