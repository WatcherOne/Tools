<script setup lang="ts">
import { MenuItem } from '@/types/menu'
import { isCollection } from '@/utils/common'

const { list } = defineProps<{
    list: MenuItem[]
}>()

const getIconColor = (path: string) => {
    return isCollection(path) ? '#529b2e' : '#909399'
}

const handleToLink = (path: string) => {
    window.open(`/${path}`)
}
</script>

<template>
    <el-col
        v-for="(item, i) in list"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :key="i">
        <el-card
            shadow="never"
            @click="handleToLink(item.path)"
            class="wat-navigation-card">
            <div class="card-header">
                <div class="card-icon">
                    <el-icon :size="40"><i-ep-odometer /></el-icon>
                </div>
                <div class="card-collection">
                    <!-- Todo: 增加 hover 的样式, 一个圈实体 -->
                    <el-tooltip
                        effect="dark"
                        :content="$t('collection.join')"
                        placement="top">
                        <el-icon :size="20" :color="getIconColor(item.path)"><i-ep-collection /></el-icon>
                    </el-tooltip>
                </div>
            </div>
            <div class="card-title">{{ $t(`${item.path}.title`) }}</div>
            <div class="card-description">{{ $t(`${item.path}.description`) }}</div>
        </el-card>
    </el-col>
</template>

<style lang="less" scoped>
.el-col {
    margin-bottom: 20px;
}
.wat-navigation-card {
    // Todo 增加出现的动画, 从上面向下面显示？
    border-width: 2px;
    cursor: pointer;
    &:hover {
        border: 2px solid #529b2e;
        animation: scrollTop .2s linear forwards;
    }
    @keyframes scrollTop {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-5px);
        }
        100% {
            transform: translateY(-10px);
        }
    }
    .card-header {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        .card-icon {
            height: 40px;
        }
    }
    .card-title {
        font-size: 18px;
        margin: 7px 0;
    }
    .card-description {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        color: #737373;
        font-size: 14px;
    }
}
</style>
