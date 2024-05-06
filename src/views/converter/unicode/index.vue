<script setup lang="ts">
import { textToUnicode } from './tool.ts'

const textInput = ref('')
const textResult = computed(() => {
    return textToUnicode(textInput.value)
})
</script>

<template>
    <el-card class="wat-converter-unicode wat-card">
        <div class="title">{{ $t('converter.unicode.textToUnicode') }}</div>
        <el-form label-position="top">
            <el-form-item label="Enter text to convert to unicode">
                <el-input type="textarea" v-model="textInput" :rows="5"></el-input>
            </el-form-item>
            <el-form-item label="Unicode from your text">
                <el-input type="textarea" v-model="textResult" readonly :rows="4"></el-input>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<style lang="less" scoped>
.wat-converter-unicode {
    .title {
        font-size: 18px;
        margin-bottom: 20px;
    }
}
</style>
