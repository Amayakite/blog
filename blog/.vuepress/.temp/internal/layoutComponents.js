import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("C:/projects/vuepress-theme-hope/packages/theme/lib/client/layouts/404.js")),
  "Layout": defineAsyncComponent(() => import("C:/projects/vuepress-theme-hope/packages/theme/lib/client/layouts/Layout.js")),
  "Slide": defineAsyncComponent(() => import("vuepress-plugin-md-enhance/lib/client/SlidePage.js")),
  "Blog": defineAsyncComponent(() => import("C:/projects/vuepress-theme-hope/packages/theme/lib/client/module/blog/layouts/Blog.js")),
}
