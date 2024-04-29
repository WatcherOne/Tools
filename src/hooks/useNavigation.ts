import { useRoute } from 'vue-router'
import { menuChildrenList } from '@/constants/menu'

export const useNavigation = () => {
    const { path, meta } = useRoute()
    const { title = '' } = meta || {}

    const currKey = path.replace(/\//g, '')
    const toolList = menuChildrenList.filter(item => item.parentPath === currKey)

    return {
        title,
        toolList
    }
}
