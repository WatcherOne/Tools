<script setup lang="ts">
import { computed } from 'vue';
import CodeList from './list'

// Todo 调整
const range = 30
const index = ref(1)
const keyword = ref('')
const list = computed(() => {
    const value = keyword.value.trim()
    return value ? CodeList.filter(item => {
        return item.area.includes(value) || item.areaEn.includes(value) || item.code.includes(value)
    }) : CodeList
})
const showList = ref(list.value.slice(0, index.value * range))
const total = computed(() => {
    return list.value.length ?? 0
})
const isOver = computed(() => {
    return Math.ceil(total.value / 30) < index + 1
})

const loadList = () => {
    if (isOver.value) return
    index.value++
    showList.value.push(...list.value.slice((index.value - 1) * range, index.value * range))
}
</script>

<template>
    <el-card class="wat-common-area-code wat-card">
        <div class="search-bar">
            <el-input
                v-model="keyword"
                placeholder="请输入关键词"
                clearable>
                <template #prepend>
                    <el-icon>
                        <i-ep-search></i-ep-search>
                    </el-icon>
                </template>
            </el-input>
        </div>
        <div v-infinite-scroll="loadList" class="list-container">
            <div v-for="(item, i) in showList" :key="i" class="list-item">
                <div class="name">{{ item.area }}-{{ item.areaEn }}</div>
                <div class="code">+{{ item.code }}</div>
            </div>
        </div>
    </el-card>
</template>

<style lang="less" scoped>
.wat-common-area-code {
    .list-container {
        height: calc(100% - 32px);
        overflow: auto;
        margin-top: 10px;
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
            }
        }
    }
}
</style>
