<script lang="ts" setup>
import { menuList } from '@/constants/menu.ts'

const isCollapse = ref(false)

const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
</script>

<template>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
		<el-radio-button :value="false">expand</el-radio-button>
		<el-radio-button :value="true">collapse</el-radio-button>
    </el-radio-group>
    <el-menu
		:collapse="isCollapse"
		@open="handleOpen"
		@close="handleClose">
		<el-menu-item v-for="item in menuList" :index="item.path">
			<el-icon>
				<component :is="item.icon"></component>
			</el-icon>
			<template #title>{{ $t(`${item.path}.title`) }}</template>
		</el-menu-item>
    </el-menu>
</template>
  