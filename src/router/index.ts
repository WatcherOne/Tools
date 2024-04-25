import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { translate } from '@/plugins/i18n'
import Layout from '@/layout/index.vue'
import Home from '@/components/HelloWorld.vue'
import TokenCreate from '@/views/token-create/index.vue'
import CaseConverter from '@/views/case-converter/index.vue'
import JsonFormat from '@/views/json-format/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        name: 'layout',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: Home,
                meta: {
                    title: '首页'
                }
            },
            {
                path: '/token-create',
                name: 'TokenCreate',
                component: TokenCreate,
                meta: {
                    title: 'Token生成器',
                    description: translate('token-create.description')
                }
            },
            {
                path: '/case-converter',
                name: 'CaseConverter',
                component: CaseConverter,
                meta: {
                    title: '大小写转换',
                    description: translate('token-create.description')
                }
            },
            {
                path: '/json-format',
                name: 'JsonFormat',
                component: JsonFormat,
                meta: {
                    title: 'JSON格式化',
                    description: translate('token-create.description')
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router
