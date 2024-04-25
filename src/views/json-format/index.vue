<script setup lang="ts">
import { prettyJSON } from './format'

console.log(prettyJSON)
</script>

<template>
    <el-card class="wat-token-create wat-card">
        <el-form>
            <el-form-item>
                <input type="textarea">
            </el-form-item>
        </el-form>
    </el-card>
</template>
