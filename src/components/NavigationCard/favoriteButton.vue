<script setup lang="ts">
import { MenuItem } from '@/types/menu'

const { item } = defineProps<{
    item: MenuItem
}>()

const toolStore = useToolStore()

const isCollected = computed(() => {
    return toolStore.isToolFavorite(item.path)
})

const toggleFavorite = (path: string) => {
    if (toolStore.isToolFavorite(path)) {
        toolStore.removeToolFromFavorites(path)
    } else {
        toolStore.addToolToFavorites(path)
    }
}
</script>

<template>
    <div class="card-favorite">
        <el-tooltip
            effect="dark"
            :content="isCollected ? $t('favorite.cancel') : $t('favorite.join')"
            placement="top">
            <el-button
                circle
                text
                @click.native.stop="toggleFavorite(item.path)"
                :class="{ 'is-collected': isCollected }">
                <template #icon>
                    <el-icon v-if="isCollected" :size="25" color="#529b2e">
                        <i-ep-star-filled />
                    </el-icon>
                    <el-icon v-else :size="25" color="#909399">
                        <i-ep-star />
                    </el-icon>
                </template>
            </el-button>
        </el-tooltip>
    </div>
</template>

<style lang="less" scoped>
.card-favorite {
    .el-button.is-text.is-collected:not(.is-disabled):hover {
        background-color: #18a0582f;
    }
} 
</style>
