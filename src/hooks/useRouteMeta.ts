import { useRoute } from 'vue-router'

export const useRouteMeta = () => {
    const { meta } = useRoute()
    const { title, isNavigation = false, keywords, description } = meta || {}

    return {
        title,
        isNavigation,
        keywords,
        description
    }
}
