'use client'

import { useRouter } from 'next/navigation'

export default function NavigationButtons() {
  const router = useRouter()

  return (
    <div className="navigation">
      <button onClick={() => router.push('/about')}>About</button>
      <button onClick={() => router.push('/')}>Main</button>
    </div>
  )
}
