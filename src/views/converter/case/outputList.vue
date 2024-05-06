<script setup lang="ts">
const props = defineProps<{ value: string }>()
const emit = defineEmits(['update:value'])

const value = useVModel(props, 'value', emit)

const { copy } = useCopy({ source: value, text: useI18n().t('button.copied') })

</script>

<template>
    <el-input v-model:value="value">
        <template #append>
            <el-button @click="copy()">
                <template #icon>
                    <el-icon><i-ep-copy-document /></el-icon>
                </template>
            </el-button>
        </template>
    </el-input>
</template>
