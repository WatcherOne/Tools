<script setup lang="ts">
import { FormData, ColOptions } from './config'
import { useLoan } from './useLoan'
import LoanForm from './LoanForm.vue'

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
    return formData.yearRate / 100 / 12
})
// 每月应还本金
const monthPrincipal = computed(() => {
    return (formData.loanAmount * 10000) / (formData.periods * 12)
})
// 每月递减额
const monthRemainAmount = computed(() => {
    return (monthPrincipal.value * monthRate.value).toFixed(2)
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

const showResult = ref(false)
const monthSupply = ref(0)
const totalRate = ref(0)
const tableList = ref<ColOptions[]>([])

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid: boolean, fields: any) => {
        if (valid) {
            const { repayment, loanAmount, periods, yearRate } = formData
            const resultObj = useLoan({ repayment, loanAmount, periods, yearRate })
            monthSupply.value = resultObj.monthSupply
            totalRate.value = resultObj.totalRate
            tableList.value = resultObj.tableList
            showResult.value = true
        } else {
            console.log('error submit!', fields)
        }
    })
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
                    <loan-form v-model:formData="formData"></loan-form>
                </el-tab-pane>
                <el-tab-pane label="公积金贷" name="fund">
                    <loan-form v-model:formData="formData"></loan-form>
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
                <el-table v-show="formData.repayment === 1" :data="tableList" border stripe style="height:400px">
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
                <el-table v-show="formData.repayment === 2" :data="tableList" border stripe style="height:400px">
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
                            <span>{{ row.remainAmount?.toFixed(2) }}元</span>
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