<script lang="ts" setup>
import MenuList from '@/constants/menu.ts'

const isCollapse = ref(true)

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
		default-active="2"
		class="el-menu-vertical-demo"
		:collapse="isCollapse"
		@open="handleOpen"
		@close="handleClose">
		<el-sub-menu index="1">
			<template #title>
				<el-icon><i-ep-location /></el-icon>
				<span>Navigator One</span>
			</template>
			<el-menu-item-group>
				<template #title><span>Group One</span></template>
				<el-menu-item index="1-1">item one</el-menu-item>
				<el-menu-item index="1-2">item two</el-menu-item>
			</el-menu-item-group>
			<el-menu-item-group title="Group Two">
				<el-menu-item index="1-3">item three</el-menu-item>
			</el-menu-item-group>
			<el-sub-menu index="1-4">
				<template #title><span>item four</span></template>
				<el-menu-item index="1-4-1">item one</el-menu-item>
			</el-sub-menu>
		</el-sub-menu>
		<el-menu-item v-for="item in MenuList" :index="item.url">
			<el-icon>
				<component :is="`i-ep-${item.icon}`"></component>
			</el-icon>
			<template #title>{{ item.title }}</template>
		</el-menu-item>
    </el-menu>
</template>
  