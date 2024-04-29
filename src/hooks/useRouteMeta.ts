import { useRoute } from 'vue-router'

export const useRouteMeta = () => {
    const { meta } = useRoute()
    // 切换语言时, 路由配置的并没有发生变化!
    const { path, parentPath, isNavigation = false, keywords } = meta || {}

    return {
        path,
        parentPath,
        isNavigation,
        keywords
    }
}
