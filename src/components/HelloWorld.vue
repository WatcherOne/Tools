<script setup lang="ts">
const count = ref(0)

const { locale } = useI18n()

const changeLanguage = () => {
	locale.value = locale.value === 'zh-cn' ? 'en' : 'zh-cn'
}

</script>

<template>

<!-- https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/common/var.scss -->
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <el-button @click="changeLanguage" type="primary">CESDA</el-button>
    <p>
      Edit
      <code>{{ $t('menu.center')}}</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
