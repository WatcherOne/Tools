<script setup lang="ts">
import { FormData } from './config.ts'
import { Proportion, Repayment, Periods } from './config'

const { formData } = defineProps<{
    formData: FormData
}>()

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
const repayTips = computed(() => {
    return formData.repayment === 1
    ? '每月还款金额不变, 其中还款的本金逐月递增, 利息逐月递减'
    : `每月还款金额递减约${monthRemainAmount.value}元, 其中每月还款本金不变, 利息逐月递减`
})

const handleChangeRadio = (value: number) => {
    const { housePrice } = formData
    const percent = value * 10 / 100
    formData.loanAmount = housePrice * (1 - percent)
}
</script>

<template>
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
    <el-form-item label="房贷利率" prop="yearRate">
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
</template>
