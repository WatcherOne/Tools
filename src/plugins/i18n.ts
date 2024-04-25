import { createI18n } from 'vue-i18n'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import zhLocales from '../../locales/zh'
import enLocales from '../../locales/en'

// 获取缓存的配置
const locale = useStorage('i18n-locale', 'zh-cn')

export const i18n = createI18n({
    locale: locale.value,
    legacy: false,
    messages: {
        [zhCn.name]: { ...zhCn, ...zhLocales },
        [en.name]: { ...en, ...enLocales }
    },
    // 如果设置为True, 则将`$t()`函数注册到全局
    globalInjection: true
})

export const translate = (localeKey: string) => {
    return i18n.global.te(localeKey) ? i18n.global.t(localeKey) : localeKey
}
