import { useState } from 'react'

export default function useLocalStorage(key: string) {
  const stored = localStorage.getItem(key)

  const [value, setValue] = useState(stored !== null ? JSON.parse(stored) : '')

  const setStoredValue = (newValue: string) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, setStoredValue]
}
