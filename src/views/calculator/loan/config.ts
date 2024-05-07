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

export interface FormData {
    housePrice: number,            // 房款总价
    paymentRatio: number | string, // 首付比例
    loanAmount: number,            // 贷款总额
    periods: number                // 期数, 按揭年份
    yearRate: number,              // 利率
    repayment: 1 | 2               // 还款方式
}

export interface ColOptions {
    period: string,
    monthInterest: number,
    monthAmount: number,
    monthSupply: number,
    remainAmount?: number
}

export interface UseLoanOptions {
    repayment: 1 | 2   // 还款方式 1: 等额本息 2: 等额本金
    loanAmount: number // 贷款金额(万元)
    periods: number    // 分期期数(年)
    yearRate: number       // 年利率
}
