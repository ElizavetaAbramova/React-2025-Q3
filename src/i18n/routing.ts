import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      ru: '/about',
    },
    '/productId/[id]': {
      en: '/productId/[id]',
      ru: '/productId/[id]',
    },
  },
})
