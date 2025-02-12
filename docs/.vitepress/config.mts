import { defineConfig } from 'vitepress'

export default defineConfig({

  head: [
    ['link', { rel: 'icon', href: 'https://github.com/MEGATREX4/MTTutorials/blob/main/docs/logo.png?raw=true' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1' }],
  ],

  lang: 'uk_ua',
  title: "MT Уроки Minecraft Fabric",
  description: "Програмування модів для Minecraft Fabric",
  base: '/MTTutorials/',
  themeConfig: {
    logo: "https://github.com/MEGATREX4/MTTutorials/blob/main/docs/logo.png?raw=true",
    nav: [
      { text: 'Головна', link: '/' },
      { 
        text: 'Уроки',
        items: [
          { text: 'Версія 1.20', link: '/1.20/' },  // Посилання на головну сторінку для 1.20
          { text: 'Версія 1.21', link: '/1.21/' }   // Посилання на головну сторінку для 1.21
        ]
      },
      { text: 'Мій сайт', link: 'https://megatrex4.netlify.app/' }
    ],

    footer: {
      message: 'Випущено за ліцензією MIT.',
      copyright: 'Copyright © 2025 MEGATREX4',
    },

    // Бічна панель
    sidebar: {
      '/1.20/': [
        {
          text: 'Уроки для версії 1.20',
          items: [
            { text: 'Налаштування IDE', link: '/1.20/' },
            { text: 'Примітивні предмети', link: '/1.20/premitive-items' },
            { text: 'Примітивні блоки', link: '/1.20/premitive-blocks' },
            { text: 'Просунуті предмети', link: '/1.20/advanced-items' },
            { text: 'Чарівна паличка', link: '/1.20/magic-wand' },
          ]
        }
      ],
      '/1.21/': [
        {
          text: 'Уроки для версії 1.21',
          items: [
            { text: 'Налаштування IDE', link: '/1.21' },
          ]
        }
      ],
      '/': [
        {
          text: 'Розділи',
          items: [
            { text: 'Головна', link: '/' },
            { text: 'Уроки 1.20', link: '/1.20/' },
            { text: 'Уроки 1.21', link: '/1.21/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/MEGATREX4' },
      { icon: 'youtube', link: 'https://youtube.com/@MEGATREX4Dev' },
      { icon: 'discord', link: 'https://discord.gg/fNXfMemWDA' },
      { icon: 'linktree', link: 'https://megatrex4.netlify.app/' }
    ]
  },

  vite: {
    define: {
      __APP_VERSION__: JSON.stringify('1.0.0'),
      __IS_PRODUCTION__: JSON.stringify(process.env.NODE_ENV === 'production'),
    }
  }
})
