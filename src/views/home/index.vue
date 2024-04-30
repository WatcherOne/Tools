<script setup lang="ts">
import { menuChildrenList } from '@/constants/menu.ts'

console.log('home')
const toolStore = useToolStore()

const favoriteList = computed(() => {
    return menuChildrenList.filter(item => {
        return toolStore.isToolFavorite(item.path)
    })
})
</script>

<template>
    <div class="home">
        <navigation
            :title="$t(`favorite.title`)"
            :toolList="favoriteList">
        </navigation>
        <navigation
            :title="$t(`tools.full`)"
            :toolList="menuChildrenList">
        </navigation>
    </div>
</template>
