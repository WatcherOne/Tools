import { MenuItem } from '@/types/menu'

const menuList: MenuItem[] = [
    {
        path: 'converter',
        icon: 'House',
        component: 'converter'
    }
]

const menuChildrenList: MenuItem[] = [
    {
        path: 'converter/case',
        parentPath: 'converter',
        component: 'converter/case',
        icon: 'House',
        keywords: ['', '', '', '']
    },
    {
        path: 'converter/case',
        parentPath: 'converter',
        component: 'converter/case',
        icon: 'House',
        keywords: ['', '', '', '']
    },
    {
        path: 'converter/case',
        parentPath: 'converter',
        component: 'converter/case',
        icon: 'House',
        keywords: ['', '', '', '']
    },
    {
        path: 'converter/case',
        parentPath: 'converter',
        component: 'converter/case',
        icon: 'House',
        keywords: ['', '', '', '']
    },
    {
        path: 'converter/case',
        parentPath: 'converter',
        component: 'converter/case',
        icon: 'House',
        keywords: ['', '', '', '']
    },
    {
        path: 'converter/case',
        parentPath: 'converter',
        component: 'converter/case',
        icon: 'House',
        keywords: ['', '', '', '']
    },
    {
        path: 'converter/case',
        parentPath: 'converter',
        component: 'converter/case',
        icon: 'House',
        keywords: ['', '', '', '']
    },
    {
        path: 'converter/case',
        parentPath: 'converter',
        component: 'converter/case',
        icon: 'House',
        keywords: ['', '', '', '']
    },
    {
        path: 'converter/case',
        parentPath: 'converter',
        component: 'converter/case',
        icon: 'House',
        keywords: ['', '', '', '']
    }
]

export {
    menuList,
    menuChildrenList
}
