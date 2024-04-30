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
        path: 'color',
        parentPath: 'converter',
        icon: 'House',
        keywords: ['', '', '', '']
    },
    {
        path: 'unicode',
        parentPath: 'converter',
        icon: 'House',
        keywords: ['', '', '', '']
    },
    {
        path: 'jsonPrettify',
        parentPath: 'converter',
        icon: 'House',
        keywords: ['', '', '', '']
    }
]

export {
    menuList,
    menuChildrenList
}
