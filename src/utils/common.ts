export const isJSON = (str: string) => {
    if (typeof str === 'string') {
        try {
            JSON.parse(str)
            return true
        } catch {
            return false
        }
    }
    return false
}

export const join = (...path: (string | undefined | null)[]) => {
    return path.filter(Boolean).join('/')
}

export const isCollection = (favorite: string) => {
    let favoriteList = localStorage.getItem('favoriteTools') || ''
    try {
        favoriteList = JSON.parse(favoriteList)
        return favoriteList?.includes(favorite)
    } catch {
        return false
    }
}
