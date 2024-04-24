import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import Home from '@/components/HelloWorld.vue'
import TokenCreate from '@/views/token-create/index.vue'

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
                    title: 'token生成器'
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
