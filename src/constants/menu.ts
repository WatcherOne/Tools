import { MenuItem } from '@/types/menu'

const menuList: MenuItem[] = [
    {
        path: 'converter',
        icon: 'House'
    },
    {
        path: 'calculator',
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
    },
    {
        path: 'bmi',
        parentPath: 'calculator',
        icon: 'House',
        keywords: ['', '', '', '']
    },
    {
        path: 'loan',
        parentPath: 'calculator',
        icon: 'House',
        keywords: ['', '', '', '']
    }
]

export {
    menuList,
    menuChildrenList
}
