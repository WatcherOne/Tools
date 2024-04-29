import { resolve } from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig({
    plugins: [
        vue(),
        VueI18n({
            runtimeOnly: true,
            jitCompilation: true,
            compositionOnly: true,
            fullInstall: true,
            strictMessage: false,
            include: [
                resolve(__dirname, 'locales/**')
            ]
        }),
        AutoImport({
            dirs: ['src/hooks'],
            imports: [
                'vue',
                'vue-router',
                '@vueuse/core',
                'vue-i18n'
            ],
            resolvers: [
                ElementPlusResolver(),
                IconsResolver({ prefix: 'icon' })
            ],
            // 1、改为true用于生成eslint配置
            // 2、生成后改回false，避免重复生成消耗
            eslintrc: {
                enabled: false,
                globalsPropValue: true
            },
            // 配置文件生成位置默认: /auto-imports.d.ts
        }),
        Components({
            // 自动导入组件位置: /src/components
            // dirs: ['src/components']
            resolvers: [
                ElementPlusResolver(),
                IconsResolver({
                    // 引入后, 使用图标组建需要添加 i-ep 作为前缀
                    // <i-ep-share></i-ep-share>
                    enabledCollections: ['ep']
                })
            ]
            // 配置文件生成位置默认: /components.d.ts
        }),
        Icons({
            autoInstall: true
        })
    ],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    resolve: {
        alias: {
            // 文件路径 URL 字符串或 URL 对象 --> 平台特定的 Node.js 文件路径
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // 开发配置 [npm run dev]
    server: {
        port: 3000,
        // 是否是严格的端口号, 如果true, 端口号被占用的情况下, vite会退出
        strictPort: true,
        host: 'localhost',
        cors: true,
        open: true
    }
})
