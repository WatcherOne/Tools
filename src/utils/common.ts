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
