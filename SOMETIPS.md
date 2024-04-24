1. 按需加载

- unplugin-vue-components
- unplugin-auto-import
- 按需加载后, 在main.ts中就不需要引入element-plus

```shell
pnpm install unplugin-vue-components unplugin-auto-import -D
```

```javascript
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
    plugins: [
        AutoImport({
            imports: [
                // 自动导入 Vue 相关函数, 如 ref / reactive 等
                'vue'
                // 还需要在 tsconfig.json 中配置, 不然在单文件中使用会 eslint 报错!
                // includes: ["./auto-imports.d.ts"]
            ]
            resolvers: [
                // 自动导入 ElementPlus 相关函数
                ElementPlusResolver(),
                // element图标是用svg渲染的, 需要额外的导入方法
                IconsResolver({ prefix: 'icon' })
            ]
        }),
        Components({
            resolvers: [
                // 自动导入 ElementPlus 组件
                ElementPlusResolver(),
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep']
                })
            ]
        })
    ]
})
```

2. @vitejs/plugin-vue

- 它可以将 Vue 单文件组件转换为 JavaScript 模块, 以便在浏览器中使用
- 此外,它还提供了一些其他功能, 例如自动导入 Vue 组件和样式等

```javascript
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue()
    ]
})
```
