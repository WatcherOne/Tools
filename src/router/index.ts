import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { capitalCase } from 'change-case'
import { translate } from '@/plugins/i18n'
import Layout from '@/layout/index.vue'
import Home from '@/views/home/index.vue'
import TokenCreate from '@/views/token-create/index.vue'
import Chmod from '@/views/chmod/index.vue'
import { menuList, menuChildrenList } from '@/constants/menu.ts'
import { MenuItem } from '@/types/menu'

const dynamicRoutes = filterAsyncRouter(menuList)

function filterAsyncRouter(list: MenuItem[]): Array<RouteRecordRaw> {
    return list.map((item: MenuItem) => {
        const { path } = item
        return <RouteRecordRaw>({
            path,
            name: capitalCase(path),
            redirect: `/${path}/home`,
            children: [
                {
                    path: `/${path}/home`,
                    name: `${capitalCase(path)}Home`,
                    component: () => import(`../views/${path}/index.vue`),
                    meta: {
                        path,
                        title: translate(`${path}.title`),
                        isNavigation: true
                    }
                },
                ...filterChildren(path)
            ]
        })
    })
}

function filterChildren(parentPath?: string): Array<RouteRecordRaw> {
    const children = menuChildrenList.filter(item => item.parentPath === parentPath)
    if (children.length === 0) return []
    return children.map((item: MenuItem) => {
        const { path, keywords = [], isOverflow = false } = item
        return <RouteRecordRaw>({
            path,
            name: capitalCase(path),
            component: () => import(`../views/${parentPath}/${path}/index.vue`),
            meta: {
                path,
                parentPath,
                title: translate(`${parentPath}.${path}.title`),
                isNavigation: false,
                isOverflow,
                keywords
            }
        })
    })
}

const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        name: 'layout',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                component: Home,
                meta: {
                    title: translate('main'),
                    isNavigation: true
                }
            },
            ...dynamicRoutes,
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
                path: '/chmod',
                name: 'Chmod',
                component: Chmod,
                meta: {
                    title: 'Chmod计算器',
                    description: translate('chmod.description')
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
