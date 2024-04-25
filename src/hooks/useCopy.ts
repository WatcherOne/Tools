import { MaybeRefOrGetter } from 'vue'
import { ElNotification } from 'element-plus'

export const useCopy = ({ source, text, createToast = true}: {
    source?: MaybeRefOrGetter<string>,
    text?: string,
    createToast?: boolean
}) => {
    const { copy, copied, ...rest } = useClipboard({
        source,
        legacy: true
    })

    return {
        ...rest,
        isCopied: copied,
        async copy(content?: string, message?: string) {
            if (source) {
                await copy()
            } else {
                await copy(content)
            }

            if (createToast) {
                ElNotification.success({ title: message ?? text })
            }
        }
    }
}
