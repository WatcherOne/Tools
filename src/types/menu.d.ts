export interface MenuItem {
    path: string,
    parentPath?: string,
    icon?: string,
    keywords?: string[],
    children?: MenuItem[]
}
