import { defineStore } from 'pinia'

export const useToolStore = defineStore('tools', () => {

    const favoriteList = useStorage('favoriteTools', []) as Ref<string[]>

    const isToolFavorite = (path: string) => {
        return favoriteList.value.includes(path)
    }

    const addToolToFavorites = (path: string) => {
        favoriteList.value.push(path)
    }
  
    const removeToolFromFavorites = (path: string) => {
        favoriteList.value = favoriteList.value.filter(name => name !== path)
    }
    
    return {
        isToolFavorite,
        addToolToFavorites,
        removeToolFromFavorites
    }
})