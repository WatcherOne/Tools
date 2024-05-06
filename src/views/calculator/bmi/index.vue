<script setup lang="ts">
const height = ref(175)
const weight = ref(65)

const bmi = computed(() => {
    const h = height.value / 100
    const h2 = h * h
    return Math.floor(weight.value / h2)
})
</script>

<template>
    <el-card class="wat-calculator-bmi wat-card">
        <el-form
            label-width="50px"
            label-position="right">
            <el-form-item :label="$t('calculator.bmi.height')">
                <el-input-number
                    v-model="height"
                    :min="1"
                    controls-position="right"
                    :placeholder="$t('tips.please') + $t('tips.input')"
                    class="full-width">
                    <template #append>cm</template>
                </el-input-number>
            </el-form-item>
            <el-form-item :label="$t('calculator.bmi.weight')">
                <el-input-number
                    v-model="weight"
                    :min="1"
                    controls-position="right"
                    :placeholder="$t('tips.please') + $t('tips.input')"
                    class="full-width">
                    <template #append>kg</template>
                </el-input-number>
            </el-form-item>
        </el-form>
        <div class="result">
            <el-alert type="warning" :closable="false">
                <template #title>
                    BMI: <span class="emphasize">{{ bmi }}</span> kg/m²
                </template>
            </el-alert>
        </div>
        <div class="info">
            <el-alert :title="$t('calculator.bmi.info')" type="success" :closable="false" />
        </div>
        <div class="description">
            <el-descriptions :column="1" border>
                <el-descriptions-item
                    label-align="center"
                    label-class-name="desc-label">
                    <template #label>{{ $t('calculator.bmi.weightUnder') }}</template>
                    <div class="content">BMI < 18.5</div>
                </el-descriptions-item>
                <el-descriptions-item
                    label-align="center"
                    label-class-name="desc-label">
                    <template #label>{{ $t('calculator.bmi.weightNormal') }}</template>
                    <div class="content">18.5 < BMI < 24</div>
                </el-descriptions-item>
                <el-descriptions-item
                    label-align="center"
                    label-class-name="desc-label">
                    <template #label>{{ $t('calculator.bmi.weightOver') }}</template>
                    <div class="content">BMI > 24</div>
                </el-descriptions-item>
                <el-descriptions-item
                    label-align="center"
                    label-class-name="desc-label">
                    <div class="content">
                        <div>{{ $t('calculator.bmi.weightOver') }}: 24 ≦ BMI < 27</div>
                        <div>{{ $t('calculator.bmi.weightOver1') }}: 27 ≦ BMI < 30</div>
                        <div>{{ $t('calculator.bmi.weightOver2') }}: 30 ≦ BMI < 35</div>
                        <div>{{ $t('calculator.bmi.weightOver3') }}: BMI ≧ 35</div>
                    </div>
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </el-card>
</template>

<style lang="less" scoped>
.wat-calculator-bmi {
    &:deep(.el-input-number .el-input__inner) {
        text-align: left;
    }
    .info {
        margin: 15px 0 10px;
    }
    .result {
        .emphasize {
            font-size: 16px;
            color: #f25757;
            font-weight: bold;
        }
    }
    .description {
        &:deep(.desc-label) {
            width: 100px;
        }
    }
}
</style>
