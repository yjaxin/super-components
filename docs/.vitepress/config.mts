import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SuperComponents",
  description: "SuperComponents",
  head: [
    ['meta', { name: 'keywords', content: '便捷、高效的使用Element plus' }],
    ['meta', { property: 'og:title', content: 'superComponents' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: [
      {
        text: '菜单',
        items: [
          { text: '安装', link: '/install' },
          { text: '快速开始', link: '/quickstart' },
          { text: 'superTable表格', link: '/table' },
          { text: 'searchFormTable表格', link: '/searchTable' },
          // { text: 'Markdown Examples', link: '/markdown-examples' },
          // { text: 'Runtime API Examples', link: '/api-examples' },
        ]
      }
    ],
    lastUpdated: {
      text: '上一次更新时间',
    },
    search: {
      provider: 'local'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yjaxin/super-components' }
    ],
    outline: 'deep',
    contributors: true,
  }
})
