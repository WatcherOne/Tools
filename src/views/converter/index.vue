<script setup lang="ts">
const { title, toolList } = useNavigation()
</script>

<template>
    <div class="wat-converter">
        <navigation
            :title="title"
            :toolList="toolList">
        </navigation>
    </div>
</template>
