'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from '../i18n/navigation'

export default function NavigationButtons() {
  const router = useRouter()
  const t = useTranslations('header')

  return (
    <div className="navigation">
      <button onClick={() => router.push('/about')}>{t('about')}</button>
      <button onClick={() => router.push('/')}>{t('main')}</button>
    </div>
  )
}
