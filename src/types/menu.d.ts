export interface MenuItem {
    path: string,
    parentPath?: string,
    component?: string,
    icon?: string,
    description?: string
    keywords?: string[],
    children?: MenuItem[]
}
