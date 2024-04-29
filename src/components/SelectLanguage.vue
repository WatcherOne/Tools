<script setup lang="ts">
import { LANG_LIST } from '@/constants/index.ts'

const { availableLocales, locale } = useI18n()

const options = computed(() => {
    return availableLocales.map(locale => ({
        label: LANG_LIST[locale] ?? locale,
        value: locale
    }))
})
</script>

<template>
    <div class="wat-select-language">
        <el-select
            v-model="locale"
            :placeholder="`${$t('tips.please')} ${$t('tips.select')}`"
            style="width:100px">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>        
    </div>
</template>
