export interface MenuItem {
    path: string,
    parentPath?: string,
    icon?: string,
    keywords?: string[],
    children?: MenuItem[],
    isOverflow?: boolean   // 是否是滚动页面
}
