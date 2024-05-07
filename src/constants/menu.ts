import { MenuItem } from '@/types/menu'

const menuList: MenuItem[] = [
    {
        path: 'converter',
        icon: 'House'
    },
    {
        path: 'calculator',
        icon: 'House'
    },
    {
        path: 'game',
        icon: 'House'
    },
    {
        path: 'develop',
        icon: 'House'
    },
    {
        path: 'common',
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
    },
    {
        path: 'languageCharm',
        parentPath: 'game',
        icon: 'House',
        keywords: ['', '', '', '']
    },
    {
        path: 'scan',
        parentPath: 'develop',
        icon: 'House',
        keywords: ['', '', '', '']
    },
    {
        path: 'areaCode',
        parentPath: 'common',
        icon: 'House',
        keywords: ['', '', '', ''],
        isOverflow: true
    },
    {
        path: 'servicePhone',
        parentPath: 'common',
        icon: 'House',
        keywords: ['', '', '', ''],
        isOverflow: true
    }
]

export {
    menuList,
    menuChildrenList
}
