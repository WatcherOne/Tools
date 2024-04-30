<script lang="ts" setup>
import { menuList } from '@/constants/menu.ts'
</script>

<template>
    <el-menu>
		<el-menu-item v-for="item in menuList" :index="item.path">
			<template #title>
				<el-icon :size="20">
					<i-ep-star></i-ep-star>
				</el-icon>
				<span>{{ $t(`${item.path}.title`) }}</span>
			</template>
		</el-menu-item>
    </el-menu>
</template>

<style lang="less" scoped>
.el-menu {
	background-color: #FFFFFF;
	border-right: 0;
	.el-menu-item {
		font-size: 16px;
		&:hover {
			background-color: #18a0581a;
		}
		&.is-active {
			color: #18a058;
		}
	}
}
</style>
  