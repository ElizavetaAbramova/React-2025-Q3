import '../index.css'
import '../styles/navbar.css'
import '../App.css'

import { Providers } from '../components/providers'

import { setRequestLocale } from 'next-intl/server'

type RootLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}
// eslint-disable-next-line react-refresh/only-export-components
export const metadata = {
  title: 'Search',
  icons: {
    icon: '/searching-icon.png',
  },
}

// eslint-disable-next-line react-refresh/only-export-components
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }]
  // return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <html lang={locale}>
      <head>
        <title>Search</title>
      </head>
      <body className="dark">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
