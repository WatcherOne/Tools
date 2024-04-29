import { MenuItem } from '@/types/menu'

const menuList: MenuItem[] = [
    {
        path: 'converter',
        icon: 'House'
    }
]

const menuChildrenList: MenuItem[] = [
    {
        path: 'case',
        parentPath: 'converter',
        icon: 'House',
        keywords: ['', '', '', '']
    },
    {
        path: 'case',
        parentPath: 'converter',
        icon: 'House',
        keywords: ['', '', '', '']
    },
    {
        path: 'case',
        parentPath: 'converter',
        icon: 'House',
        keywords: ['', '', '', '']
    },
    {
        path: 'case',
        parentPath: 'converter',
        icon: 'House',
        keywords: ['', '', '', '']
    }
]

export {
    menuList,
    menuChildrenList
}
