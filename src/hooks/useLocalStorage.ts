import { useEffect, useState } from 'react'

export default function useLocalStorage(key: string) {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const stored = localStorage.getItem(key)
    if (stored !== null) {
      setValue(JSON.parse(stored))
    }
  }, [key])

  const setStoredValue = (newValue: string) => {
    setValue(newValue)
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(newValue))
    }
  }

  return [value, setStoredValue] as const
}
