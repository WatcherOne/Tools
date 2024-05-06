const ChineseNumerals = ['一', '二', '三', '四', '五', '六', '七', '八', '九']

// 首付比例
export const Proportion = Array.from({ length: 9 }).map((_, i) => {
    return { label: `${ChineseNumerals[i]}成`, value: i + 1 }
})

// 期数
export const Periods = Array.from({ length: 30 }).map((_, i) => {
    return { label: `${i + 1}年(${(i + 1) * 12}期)`, value: i + 1 }
})

// 还款方式
export const Repayment = [
    { label: '等额本息', value: 1 },
    { label: '等额本金', value: 2 }
]
