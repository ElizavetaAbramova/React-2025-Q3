import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'

interface Props {
  children: React.ReactNode
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.theme.mode)

  useEffect(() => {
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(theme)
  }, [theme])

  return <>{children}</>
}

export default ThemeProvider
