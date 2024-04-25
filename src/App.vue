<script setup lang="ts">
import { I18N_KEY } from './constants'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import '@/assets/styles/common.less'
import '@/assets/styles/element-plus.less'

const { locale } = useI18n()

// 将`i18n中的值`与`localStorage中的值`同步
syncRef(
    locale,
    useStorage(I18N_KEY, locale)
)

const elementLocale = computed(() => {
    return locale.value === 'en' ? en : zhCn
})
</script>

<template>
    <el-config-provider :locale="elementLocale">
        <RouterView></RouterView>
    </el-config-provider>
</template>
