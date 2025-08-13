import '../index.css'
import '../styles/navbar.css'
import '../App.css'

import { Providers } from '../components/providers'
import ThemeSwitcher from '../components/themeToggle/ThemeToggle'
import NavigationButtons from '../components/NavigationButtons'

type RootLayoutProps = {
  children: React.ReactNode
  params: { locale: string }
}
// eslint-disable-next-line react-refresh/only-export-components
export const metadata = {
  title: 'Search',
  icons: {
    icon: '/searching-icon.png',
  },
}
export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = 'en'

  return (
    <html lang={locale}>
      <head>
        <title>Search</title>
      </head>
      <body className="dark">
        <Providers>
          <header className="navbar">
            <NavigationButtons></NavigationButtons>
            <ThemeSwitcher></ThemeSwitcher>
            <button>Language</button>
          </header>
          <div id="root">{children}</div>
          <footer className="footer">
            <p>© 2025</p>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
