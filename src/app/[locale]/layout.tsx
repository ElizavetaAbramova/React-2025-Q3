import '../../index.css'
import '../../styles/navbar.css'
import '../../App.css'

import ThemeSwitcher from '../../components/themeToggle/ThemeToggle'
import NavigationButtons from '../../components/NavigationButtons'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import LanguageSwitcher from '../components/LanguageSwitcher'

type RootLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = (await import(`../../../messages/${locale}.json`)).default

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <header className="navbar">
        <NavigationButtons></NavigationButtons>
        <ThemeSwitcher></ThemeSwitcher>
        <LanguageSwitcher></LanguageSwitcher>
      </header>
      <div id="root">{children}</div>
      <footer className="footer">
        <p>© 2025</p>
      </footer>
    </NextIntlClientProvider>
  )
}
