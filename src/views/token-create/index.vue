<script setup lang="ts">
import { createToken } from './create.ts'
import { reactive, ref } from 'vue'
import type { CSSProperties } from 'vue'

interface Mark {
  style: CSSProperties
  label: string
}

type Marks = Record<number, Mark | string>

const value = ref([30, 60])
const marks = reactive<Marks>({
  0: '0°C',
  8: '8°C',
  37: '37°C',
  50: {
    style: {
      color: '#1989FA',
    },
    label: '50%',
  },
})

// Token: 封装了共通函数干嘛的？
// Token: 参数也封装了？

const length = ref(64)
const withUppercase = ref(true)
const withLowercase = ref(true)
const withNumbers = ref(true)
const withSymbols = ref(true)

const token = ref(null)

onMounted(() => {
    token.value = createToken({
        length: length.value,
        withUppercase: withUppercase.value,
        withLowercase: withLowercase.value,
        withNumbers: withNumbers.value,
        withSymbols: withSymbols.value
    })
})

</script>

<template>
    <el-card class="wat-token-create wat-card">
        <el-form size="large">
            <el-form-item>
                <el-checkbox v-model="withUppercase" label="大写"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="withLowercase" label="小写"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="withNumbers" label="数字"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="withSymbols" label="符号"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-slider v-model="length" :marks="marks" />
            </el-form-item>
            <el-form-item>
                <el-input type="textarea" :value="token" readonly :rows="4"></el-input>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<style>
.wat-card {
    min-width: 600px;
}
</style>
