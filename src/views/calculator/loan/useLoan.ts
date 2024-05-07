import { UseLoanOptions, ColOptions } from './config.ts'

export const useLoan = (options: UseLoanOptions) => {

    const  {
        repayment = 1,
        loanAmount,
        periods,
        yearRate
    } = options
    const amount = loanAmount * 10000
    const times = periods * 12
    const monthRate = yearRate / 100 / 12
    const divisor = (1 + monthRate) ** times - 1

    let monthSupply = 0
    let totalRate = 0
    let tableList: ColOptions[] = []

    // 计算每月应还利息
    const calculateMonthInterest = (index: number) => {
        return amount * monthRate * ((1 + monthRate) ** times - (1 + monthRate) ** (index - 1)) / divisor
    }

    // 计算每月应还本金
    const calculateMonthAmount = (index: number) => {
        return amount * monthRate * ((1 + monthRate) ** (index - 1)) / divisor
    }

    if (repayment === 1) {
        // 等额本息
        // 每月月供额=〔贷款的本金×月利率×(1+月利率)^还款月数〕÷〔(1+月利率)^还款月数-1〕
        // 每月应还利息=贷款的本金×月利率×〔(1+月利率)^还款月数-(1+月利率)^(还款月序号-1)〕÷〔(1+月利率)^还款月数-1〕
        // 每月应还本金=贷款的本金×月利率×(1+月利率)^(还款月序号-1)÷〔(1+月利率)^还款月数-1〕
        // 总利息=还款月数×每月月供额-贷款的本金

        monthSupply = (amount * monthRate * ((1 + monthRate) ** times)) / divisor
        totalRate = times * monthSupply - amount
        tableList = Array.from({ length: times }).map((_, i) => {
            return {
                period: `第${i + 1}期`,
                monthInterest: calculateMonthInterest(i + 1),
                monthAmount: calculateMonthAmount(i + 1),
                monthSupply
            }
        })
    } else {
        // 等额本金
        // 每月月供额=(贷款的本金÷还款月数)+(贷款的本金-已归还本金累计额)×月利率
        // 每月应还本金=贷款的本金÷还款月数
        // 每月应还利息=剩余本金×月利率=(贷款的本金-已归还本金累计额)×月利率
        // 每月月供递减额=每月应还本金×月利率=贷款的本金÷还款月数×月利率
        // 总利息= 还款月数×(总贷款额×月利率-月利率×(总贷款额÷还款月数)*(还款月数-1)÷2)

        const monthPrincipal = amount / times  // 每月应还本金
        monthSupply = monthPrincipal + (amount - 0) * monthRate
        totalRate = times * (amount * monthRate - monthRate * monthPrincipal * (times - 1) / 2)
        tableList = Array.from({ length: times }).map((_, i) => {
            const remainMonthTotal = (amount - monthPrincipal * i) * monthRate
            return {
                period: `第${i + 1}期`,
                monthInterest: remainMonthTotal,
                monthAmount: monthPrincipal,
                monthSupply: monthPrincipal + remainMonthTotal,
                remainAmount: amount - (monthPrincipal * (i + 1))
            }
        })
    }

    return {
        monthSupply,
        totalRate,
        tableList
    }
}
