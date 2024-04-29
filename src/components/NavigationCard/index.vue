<script setup lang="ts">
import { MenuItem } from '@/types/menu'
import { isCollection, join } from '@/utils/common'

const { list } = defineProps<{
    list: MenuItem[]
}>()

const handleToLink = (item: MenuItem) => {
    const { parentPath, path } = item
    window.open(`/${join(parentPath, path)}`)
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
            shadow="hover"
            @click="handleToLink(item)"
            class="wat-navigation-card">
            <div class="card-header">
                <div class="card-icon">
                    <el-icon :size="40"><i-ep-odometer /></el-icon>
                </div>
                <div class="card-collection">
                    <el-tooltip
                        effect="dark"
                        :content="$t('collection.join')"
                        placement="top">
                        <el-button circle text>
                            <template #icon>
                                <el-icon v-if="isCollection(item.path)" :size="25" color="#529b2e">
                                    <i-ep-star-filled />
                                </el-icon>
                                <el-icon v-else :size="25" color="#909399">
                                    <i-ep-star />
                                </el-icon>
                            </template>
                        </el-button>
                    </el-tooltip>
                </div>
            </div>
            <div class="card-title">{{ $t(`${item.parentPath}.${item.path}.title`) }}</div>
            <div class="card-description">{{ $t(`${item.parentPath}.${item.path}.description`) }}</div>
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
