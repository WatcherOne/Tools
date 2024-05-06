<script setup lang="ts">
import { Proportion, Repayment, Periods } from './config'

interface FormData {
    housePrice: number,            // 房款总价
    paymentRatio: number | string, // 首付比例
    loanAmount: number,            // 贷款总额
    periods: number                // 期数, 按揭年份
    yearRate: number,              // 利率
    repayment: 1 | 2               // 还款方式
}

interface ColOptions {
    period: string,
    monthInterest: number,
    monthAmount: number,
    monthSupply: number,
    remainAmount?: number
}

const { t } = useI18n()
const activeTab = ref('business')

const formRef = ref<FormInstance>()
const formData = reactive<FormData>({
    housePrice: 100,
    paymentRatio: '',
    loanAmount: 70,
    periods: 20,
    yearRate: 3.75,
    repayment: 1
})
// 月利率
const monthRate = computed(() => {
    return formData.yearRate / 100 /12
})
const divisor = computed(() => {
    return (1 + monthRate.value) ** (formData.periods * 12) -1
})
// 每月应还本金
const monthPrincipal = computed(() => {
    return (formData.loanAmount * 10000) / (formData.periods * 12)
})
// 每月递减额
const monthRemainAmount = computed(() => {
    return (monthPrincipal.value * monthRate.value).toFixed(2)
})
const repayTips = computed(() => {
    return formData.repayment === 1
    ? '每月还款金额不变, 其中还款的本金逐月递增, 利息逐月递减'
    : `每月还款金额递减约${monthRemainAmount.value}元, 其中每月还款本金不变, 利息逐月递减`
})
const formRules = reactive<FormRules<FormData>>({
    housePrice: [
       { required: true, message: t('rules.notEmpty'), trigger: 'blur' },
       { type: 'number', message: '请输入数字格式' }
    ],
    loanAmount: { required: true, message: t('rules.notEmpty'), trigger: 'blur' },
    periods: { required: true, message: t('rules.notEmpty'), trigger: 'blur' },
    yearRate: { required: true, message: t('rules.notEmpty'), trigger: 'blur' }
})

const handleChangeRadio = (value: number) => {
    const { housePrice } = formData
    const percent = value * 10 / 100
    formData.loanAmount = housePrice * (1 - percent)
}

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            const { repayment } = formData
            repayment === 1 ? equalPriceAndInterest() : equalPriceAndAmount()
        } else {
            console.log('error submit!', fields)
        }
    })
}

const showResult = ref(false)
const tableList = ref<ColOptions[]>([])
const totalRate = ref(0)
const monthSupply = ref(0)

// 每月月供额=〔贷款的本金×月利率×(1+月利率)^还款月数〕÷〔(1+月利率)^还款月数-1〕
// 每月应还利息=贷款的本金×月利率×〔(1+月利率)^还款月数-(1+月利率)^(还款月序号-1)〕÷〔(1+月利率)^还款月数-1〕
// 每月应还本金=贷款的本金×月利率×(1+月利率)^(还款月序号-1)÷〔(1+月利率)^还款月数-1〕
// 总利息=还款月数×每月月供额-贷款的本金
const equalPriceAndInterest = () => {
    const { loanAmount, periods } = formData
    const times = periods * 12
    monthSupply.value = (loanAmount * 10000 * monthRate.value * ((1 + monthRate.value) ** times)) / divisor.value
    totalRate.value = times * monthSupply.value - loanAmount * 10000
    tableList.value = Array.from({ length: times }).map((_, i) => {
        return {
            period: `第${i + 1}期`,
            monthInterest: calculateMonthInterest(i + 1),
            monthAmount: calculateMonthAmount(i + 1),
            monthSupply: monthSupply.value
        }
    })
    showResult.value = true
}

// 计算每月应还利息
const calculateMonthInterest = (index: number) => {
    const { loanAmount, periods } = formData
    return loanAmount * 10000 * monthRate.value * ((1 + monthRate.value) ** (periods * 12) - (1 + monthRate.value) ** (index - 1)) / divisor.value
}

// 计算每月应还本金
const  calculateMonthAmount = (index: number) => {
    const { loanAmount } = formData
    return loanAmount * 10000 * monthRate.value * ((1 + monthRate.value) ** (index - 1)) / divisor.value
}

const equalPriceAndAmount = () => {
    // 每月月供额=(贷款的本金÷还款月数)+(贷款的本金-已归还本金累计额)×月利率
    // 每月应还本金=贷款的本金÷还款月数
    // 每月应还利息=剩余本金×月利率=(贷款的本金-已归还本金累计额)×月利率
    // 每月月供递减额=每月应还本金×月利率=贷款的本金÷还款月数×月利率
    // 总利息= 还款月数×(总贷款额×月利率-月利率×(总贷款额÷还款月数)*(还款月数-1)÷2)
    const { loanAmount, periods } = formData
    const times = periods * 12
    monthSupply.value = monthPrincipal.value + (loanAmount * 10000 - 0) * monthRate.value
    totalRate.value = times * (loanAmount * 10000 * monthRate.value - monthRate.value * monthPrincipal.value * (times - 1) / 2)
    tableList.value = Array.from({ length: times }).map((_, i) => {
        const remainMonthTotal = (loanAmount * 10000 - monthPrincipal.value * i) * monthRate.value
        return {
            period: `第${i + 1}期`,
            monthInterest: remainMonthTotal,
            monthAmount: monthPrincipal.value,
            monthSupply: monthPrincipal.value + remainMonthTotal,
            remainAmount: loanAmount * 10000 - (monthPrincipal.value * (i + 1))
        }
    })
    showResult.value = true
}
</script>

<template>
    <el-card class="wat-calculator-loan wat-card">
        <el-form
            ref="formRef"
            :model="formData"
            :rules="formRules"
            label-width="80px"
            label-position="right">
            <el-tabs v-model="activeTab">
                <el-tab-pane label="商业贷" name="business">
                    <el-form-item label="房款总价" prop="housePrice">
                        <el-input v-model.number="formData.housePrice">
                            <template #append>万元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="首付比例">
                        <el-select v-model="formData.paymentRatio" @change="handleChangeRadio">
                            <el-option
                                v-for="item in Proportion"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="贷款总额" prop="loanAmount">
                        <el-input v-model.number="formData.loanAmount">
                            <template #append>万元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="总计期数" prop="periods">
                        <el-select v-model="formData.periods">
                            <el-option
                                v-for="item in Periods"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="房款利率" prop="yearRate">
                        <el-input v-model.number="formData.yearRate">
                            <template #append>%</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="还款方式">
                        <el-select v-model="formData.repayment">
                            <el-option
                                v-for="item in Repayment"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="">
                        <el-alert type="warning" :closable="false" size="mini">{{ repayTips }}</el-alert>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="公积金贷" name="fund">
                    
                </el-tab-pane>
                <el-tab-pane label="组合贷" name="combination">
                    
                </el-tab-pane>
            </el-tabs>
            <div class="card-footer">
                <el-button type="primary" @click="submitForm(formRef)">计算</el-button>
            </div>
            <div v-show="showResult" class="result-loan">
                <div class="result">
                    <el-descriptions :column="1" border>
                        <el-descriptions-item
                            label-align="right"
                            label-class-name="desc-label">
                            <template #label>房款总价: </template>
                            <div class="content">{{ formData.housePrice.toFixed(2) }}万元</div>
                        </el-descriptions-item>
                        <el-descriptions-item
                            label-align="right"
                            label-class-name="desc-label">
                            <template #label>贷款总额: </template>
                            <div class="content">{{ formData.loanAmount.toFixed(2) }}万元</div>
                        </el-descriptions-item>
                        <el-descriptions-item
                            label-align="right"
                            label-class-name="desc-label">
                            <template #label>月利率: </template>
                            <div class="content">{{ monthRate.toFixed(6) }}%</div>
                        </el-descriptions-item>
                        <el-descriptions-item
                            label-align="right"
                            label-class-name="desc-label">
                            <template #label>{{ formData.repayment === 1 ? '每月月供: ' : '首月月供' }}</template>
                            <div class="content">
                                <span class="important">{{ monthSupply.toFixed(2) }}</span>元
                            </div>
                        </el-descriptions-item>
                        <el-descriptions-item
                            v-if="formData.repayment === 2"
                            label-align="right"
                            label-class-name="desc-label">
                            <template #label>每月递减: </template>
                            <div class="content">{{ monthRemainAmount }}元/月</div>
                        </el-descriptions-item>
                        <el-descriptions-item
                            label-align="right"
                            label-class-name="desc-label">
                            <template #label>总利息: </template>
                            <div class="content">{{ (totalRate / 10000).toFixed(2) }}万元</div>
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class="show-total">
                    <div class="label">
                        <div class="title">还款总额</div>
                        <div>{{ (formData.loanAmount + totalRate / 10000).toFixed(2) }}万</div>
                    </div>
                    <div class="symbol">=</div>
                    <div class="label">
                        <div class="title">贷款总额</div>
                        <div>{{ formData.loanAmount }}万</div>
                    </div>
                    <div class="symbol">+</div>
                    <div class="label">
                        <div class="title">支付利息</div>
                        <div>{{ (totalRate / 10000).toFixed(2) }}万</div>
                    </div>
                </div>
                <el-table v-show="formData.repayment === 1" :data="tableList" border style="height:400px">
                    <el-table-column prop="period" label="期数" width="100" align="center"></el-table-column>
                    <el-table-column prop="monthSupply" label="月供总额" align="center">
                        <template #default="{ row }">
                            <span>{{ row.monthSupply.toFixed(2) }}元</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="monthAmount" label="月供本金" align="center">
                        <template #default="{ row }">
                            <span>{{ row.monthAmount.toFixed(2) }}元</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="monthInterest" label="月供利息" align="center">
                        <template #default="{ row }">
                            <span>{{ row.monthInterest.toFixed(2) }}元</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-table v-show="formData.repayment === 2" :data="tableList" border style="height:400px">
                    <el-table-column prop="period" label="期数" width="100" align="center"></el-table-column>
                    <el-table-column prop="monthSupply" label="月供总额" align="center">
                        <template #default="{ row }">
                            <span>{{ row.monthSupply.toFixed(2) }}元</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="monthAmount" label="月供本金" align="center">
                        <template #default="{ row }">
                            <span>{{ row.monthAmount.toFixed(2) }}元</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="monthInterest" label="月供利息" align="center">
                        <template #default="{ row }">
                            <span>{{ row.monthInterest.toFixed(2) }}元</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remainAmount" label="剩余应还金额" align="center">
                        <template #default="{ row }">
                            <span>{{ row?.remainAmount.toFixed(2) }}元</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-form>
    </el-card>
</template>

<style lang="less" scoped>
.wat-calculator-loan {
    .el-tabs {
        &:deep(.el-tabs__header) {
            margin-bottom: 25px;
            .el-tabs__item {
                height: 30px;
                font-size: 16px;
                padding-bottom: 10px;
            }
        }
    }
    .result-loan {
        margin-top: 15px;
        .result {
            &:deep(.desc-label) {
                width: 100px;
            }
            .content .important {
                font-weight: bold;
                color: #ee8c9d;
            }
        }
        .show-total {
            margin: 10px 0;
            display: flex;
            align-items: center;
            .label {
                color: #67C23A;
                background: #F0F9EB;
                padding: 5px 20px;
                text-align: center;
                border-radius: 5px;
                .title {
                    font-size: 12px;
                }
            }
            .symbol {
                margin: 0 10px;
                font-size: 20px;
                color: #666;
            }
        }
    }
}
</style>