'use client'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '../../i18n/navigation'
import { useParams } from 'next/navigation'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const locale = useLocale()
  const t = useTranslations('header')

  const handleSwitch = () => {
    const newLocale = locale === 'ru' ? 'en' : 'ru'

    if (params && params.id && pathname === '/productId/[id]') {
      const itemId = params.id.toString()
      router.push({ pathname: pathname, params: { id: itemId } }, { locale: newLocale })
    } else if (pathname !== '/productId/[id]') {
      router.push(pathname, { locale: newLocale })
    }
  }

  return <button onClick={() => handleSwitch()}>{t('language')}</button>
}
