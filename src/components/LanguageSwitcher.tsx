'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LanguageSwitcher() {
  const pathname = usePathname()

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Link href={pathname} locale="en">
        EN
      </Link>
      <Link href={pathname} locale="ru">
        RU
      </Link>
    </div>
  )
}
