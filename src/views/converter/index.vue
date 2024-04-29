<script setup lang="ts">
const { path, toolList } = useNavigation()
</script>

<template>
    <div class="wat-converter">
        <navigation
            :title="$t(`${path}.title`)"
            :toolList="toolList">
        </navigation>
    </div>
</template>
