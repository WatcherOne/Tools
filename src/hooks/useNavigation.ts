import { menuChildrenList } from '@/constants/menu'

export const useNavigation = () => {
    const { path } = useRouteMeta()

    const toolList = menuChildrenList.filter(item => item.parentPath === path)

    return {
        path,
        toolList
    }
}
