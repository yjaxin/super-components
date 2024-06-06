import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // 这里不设置也是默认dist
    outDir:"dist",
    // 兼容
    target: "es2015",
    //压缩
    minify: true,
    rollupOptions: {
      input: ['build/index.ts'],
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "element-plus"],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: resolve(__dirname, './dist/es'),
          preserveModulesRoot: 'dist'
        },
        {
          format: 'cjs',
          //不用打包成.mjs
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: resolve(__dirname, './dist/lib'),
          preserveModulesRoot: 'src'
        }
      ],
    },
    lib: {
      entry: './build/index.ts',
      formats: ['es', 'cjs']
    }
  },
});
