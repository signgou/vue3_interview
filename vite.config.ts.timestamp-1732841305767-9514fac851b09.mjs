// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/Code/vue/vue3_interview/node_modules/.pnpm/vite@5.4.10_@types+node@20.17.6_sass@1.80.6/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Code/vue/vue3_interview/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@5.4.10_@types+node@20.17.6_sass@1.80.6__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/Code/vue/vue3_interview/node_modules/.pnpm/unplugin-auto-import@0.18.3_rollup@4.24.3/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/Code/vue/vue3_interview/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.2_rollup@4.24.3_vue@3.5.12_typescript@5.6.3_/node_modules/unplugin-vue-components/dist/vite.js";
import { VantResolver } from "file:///D:/Code/vue/vue3_interview/node_modules/.pnpm/@vant+auto-import-resolver@1.2.1/node_modules/@vant/auto-import-resolver/dist/index.esm.mjs";
import basicSsl from "file:///D:/Code/vue/vue3_interview/node_modules/.pnpm/@vitejs+plugin-basic-ssl@1.1.0_vite@5.4.10_@types+node@20.17.6_sass@1.80.6_/node_modules/@vitejs/plugin-basic-ssl/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/Code/vue/vue3_interview/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.4.10_@types+node@20.17.6_sass@1.80.6_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
import { viteMockServe } from "file:///D:/Code/vue/vue3_interview/node_modules/.pnpm/vite-plugin-mock@3.0.2_esbuild@0.21.5_mockjs@1.1.0_vite@5.4.10_@types+node@20.17.6_sass@1.80.6_/node_modules/vite-plugin-mock/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/Code/vue/vue3_interview/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()]
    }),
    Components({
      resolvers: [VantResolver()]
    }),
    //ssl证书
    basicSsl({
      /** name of certification */
      name: "test",
      /** custom trust domains */
      domains: ["*.custom.com"],
      /** custom certification directory */
      certDir: "/Users/.../.devServer/cert"
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // Specify symbolId format
      symbolId: "icon-[dir]-[name]"
    }),
    viteMockServe({
      mockPath: "mock",
      enable: true,
      watchFiles: true
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        api: "modern-compiler",
        // or 'modern'
        additionalData: '@use "@/styles/globalVar.scss" as gV;'
      }
    }
  },
  server: {
    host: "0.0.0.0",
    https: {}
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDb2RlXFxcXHZ1ZVxcXFx2dWUzX2ludGVydmlld1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcQ29kZVxcXFx2dWVcXFxcdnVlM19pbnRlcnZpZXdcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0NvZGUvdnVlL3Z1ZTNfaW50ZXJ2aWV3L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IFZhbnRSZXNvbHZlciB9IGZyb20gJ0B2YW50L2F1dG8taW1wb3J0LXJlc29sdmVyJ1xuaW1wb3J0IGJhc2ljU3NsIGZyb20gJ0B2aXRlanMvcGx1Z2luLWJhc2ljLXNzbCdcbi8vc3ZnXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG4vL21vY2tcbmltcG9ydCB7IHZpdGVNb2NrU2VydmUgfSBmcm9tICd2aXRlLXBsdWdpbi1tb2NrJ1xuXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIHJlc29sdmVyczogW1ZhbnRSZXNvbHZlcigpXSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW1ZhbnRSZXNvbHZlcigpXSxcbiAgICB9KSxcbiAgICAvL3NzbFx1OEJDMVx1NEU2NlxuICAgIGJhc2ljU3NsKHtcbiAgICAgIC8qKiBuYW1lIG9mIGNlcnRpZmljYXRpb24gKi9cbiAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgIC8qKiBjdXN0b20gdHJ1c3QgZG9tYWlucyAqL1xuICAgICAgZG9tYWluczogWycqLmN1c3RvbS5jb20nXSxcbiAgICAgIC8qKiBjdXN0b20gY2VydGlmaWNhdGlvbiBkaXJlY3RvcnkgKi9cbiAgICAgIGNlcnREaXI6ICcvVXNlcnMvLi4uLy5kZXZTZXJ2ZXIvY2VydCcsXG4gICAgfSksXG5cbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAvLyBTcGVjaWZ5IHRoZSBpY29uIGZvbGRlciB0byBiZSBjYWNoZWRcbiAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgLy8gU3BlY2lmeSBzeW1ib2xJZCBmb3JtYXRcbiAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuICAgIH0pLFxuICAgIHZpdGVNb2NrU2VydmUoe1xuICAgICAgbW9ja1BhdGg6ICdtb2NrJyxcbiAgICAgIGVuYWJsZTogdHJ1ZSxcbiAgICAgIHdhdGNoRmlsZXM6IHRydWUsXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgYXBpOiAnbW9kZXJuLWNvbXBpbGVyJywgLy8gb3IgJ21vZGVybidcbiAgICAgICAgYWRkaXRpb25hbERhdGE6ICdAdXNlIFwiQC9zdHlsZXMvZ2xvYmFsVmFyLnNjc3NcIiBhcyBnVjsnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgaHR0cHM6IHt9LFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1EsU0FBUyxlQUFlLFdBQVc7QUFDM1MsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sY0FBYztBQUVyQixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFVBQVU7QUFFakIsU0FBUyxxQkFBcUI7QUFYcUksSUFBTSwyQ0FBMkM7QUFjcE4sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLGFBQWEsQ0FBQztBQUFBLElBQzVCLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxhQUFhLENBQUM7QUFBQSxJQUM1QixDQUFDO0FBQUE7QUFBQSxJQUVELFNBQVM7QUFBQTtBQUFBLE1BRVAsTUFBTTtBQUFBO0FBQUEsTUFFTixTQUFTLENBQUMsY0FBYztBQUFBO0FBQUEsTUFFeEIsU0FBUztBQUFBLElBQ1gsQ0FBQztBQUFBLElBRUQscUJBQXFCO0FBQUE7QUFBQSxNQUVuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUE7QUFBQSxNQUUxRCxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsTUFDWixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixZQUFZO0FBQUEsSUFDZCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLG1CQUFtQjtBQUFBLFFBQ25CLEtBQUs7QUFBQTtBQUFBLFFBQ0wsZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTyxDQUFDO0FBQUEsRUFDVjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
