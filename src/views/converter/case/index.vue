<script setup lang="ts">
import {
    camelCase,
    capitalCase,
    constantCase,
    dotCase,
    trainCase,
    noCase
} from 'change-case'
const input = ref('Welcome to use more interesting plugins')

const { t } = useI18n()
const baseConfig = {
    stripRegexp: /[^A-Za-zÀ-ÖØ-öø-ÿ]+/gi
}
const { i18Key } = useRouteMeta()
console.log(i18Key)

const formats = computed(() => [
    {
        label: t(`${i18Key}.lowercase`),
        value: input.value.toLocaleLowerCase()
    },
    {
        label: t(`${i18Key}.uppercase`),
        value: input.value.toLocaleUpperCase()
    },
    {
        label: t(`${i18Key}.camelcase`),
        value: camelCase(input.value, baseConfig as any)
    },
    {
        label: t(`${i18Key}.capitalcase`),
        value: capitalCase(input.value, baseConfig as any)
    },
    {
        label: t(`${i18Key}.constantcase`),
        value: constantCase(input.value, baseConfig as any),
    },
    {
        label: t(`${i18Key}.dotcase`),
        value: dotCase(input.value, baseConfig as any),
    },
    {
        label: t(`${i18Key}.headercase`),
        value: trainCase(input.value, baseConfig as any),
    },
    {
        label: t(`${i18Key}.nocase`),
        value: noCase(input.value, baseConfig as any),
    }
    // Todo: Add more function to handle string
])
</script>

<template>
    <el-card class="wat-converter-case wat-card">
        <el-form
            label-width="100px"
            label-position="right">
            <el-form-item :label="`${t(`${i18Key}.yourstring`)}:`">
                <el-input v-model="input" placeholder="Your String"></el-input>
            </el-form-item>
            <el-divider />
            <el-form-item v-for="(item, i) in formats" :key="i" :label="`${item.label}:`">
                <el-input v-model="item.value">
                    <template #append>
                        <el-button>
                            <template #icon>
                                <el-icon><i-ep-copy-document /></el-icon>
                            </template>
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
    </el-card>
</template>
