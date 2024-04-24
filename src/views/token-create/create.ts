import { randomDrawString } from '@/utils/random.ts'

export const createToken = ({
    length = 64,
    withUppercase = true,
    withLowercase = true,
    withNumbers = true,
    withSymbols = true
}: {
    length?: number,
    withUppercase?: boolean,
    withLowercase?: boolean,
    withNumbers?: boolean,
    withSymbols?: boolean
}) => {
    const allAlphabet = [
        withUppercase ? 'ABCDEFGHIJKLMOPQRSTUVWXYZ' : '',
        withLowercase ? 'abcdefghijklmopqrstuvwxyz' : '',
        withNumbers ? '0123456789' : '',
        withSymbols ? '.,;:!?./-"\'#{([-|\\@)]=}*+' : ''
    ].join('')

    return randomDrawString(allAlphabet.repeat(length)).substring(0, length)
}

