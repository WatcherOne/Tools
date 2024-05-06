<script setup lang="ts">
import { createToken } from './create.ts'

const length = ref(64)
const withUppercase = ref(true)
const withLowercase = ref(true)
const withNumbers = ref(true)
const withSymbols = ref(true)

const token = ref('')

watch([length, withUppercase, withLowercase, withNumbers, withSymbols], () => {
    token.value = generatorToken()
})

const refresh = () => {
    token.value = generatorToken()
}

onMounted(() => {
    token.value = generatorToken()
})

const generatorToken = () => {
    return createToken({
        length: length.value,
        withUppercase: withUppercase.value,
        withLowercase: withLowercase.value,
        withNumbers: withNumbers.value,
        withSymbols: withSymbols.value
    })
}

const { copy } = useCopy({ source: token, text: useI18n().t('button.copied') })
</script>

<template>
    <el-card class="wat-token-create wat-card">
        <el-form>
            <el-form-item>
                <el-checkbox v-model="withUppercase" :label="$t('token-create.uppercase')"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="withLowercase" :label="$t('token-create.lowercase')"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="withNumbers" :label="$t('token-create.numbers')"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="withSymbols" :label="$t('token-create.symbols')"></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-slider v-model="length" :min="1" :max="512"></el-slider>
            </el-form-item>
            <el-form-item>
                <el-input type="textarea" :value="token" readonly :rows="5"></el-input>
            </el-form-item>
        </el-form>
        <div class="card-footer">
            <el-button @click="copy()" type="primary">{{ $t('button.copy') }}</el-button>
            <el-button @click="refresh" type="success">{{ $t('button.refresh') }}</el-button>
        </div>
    </el-card>
</template>
