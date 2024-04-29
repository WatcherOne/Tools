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
const formats = computed(() => [
    {
        label: t('converter.case.lowercase'),
        value: input.value.toLocaleLowerCase()
    },
    {
        label: t('converter.case.uppercase'),
        value: input.value.toLocaleUpperCase()
    },
    {
        label: t('converter.case.camelcase'),
        value: camelCase(input.value, baseConfig as any)
    },
    {
        label: t('converter.case.capitalcase'),
        value: capitalCase(input.value, baseConfig as any)
    },
    {
        label: t('converter.case.constantcase'),
        value: constantCase(input.value, baseConfig as any),
    },
    {
        label: t('converter.case.dotcase'),
        value: dotCase(input.value, baseConfig as any),
    },
    {
        label: t('converter.case.headercase'),
        value: trainCase(input.value, baseConfig as any),
    },
    {
        label: t('converter.case.nocase'),
        value: noCase(input.value, baseConfig as any),
    }
    // Todo: Add more function to handle string
])
</script>

<template>
    <el-card class="wat-token-create wat-card">
        <el-form
            label-width="100px"
            label-position="right">
            <el-form-item :label="`${$t('converter.case.yourstring')}:`">
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
