import '../../styles/theme-switcher.css'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../features/theme/themeSlicer'
import type { RootState } from '../../store/store'

export default function ThemeSwitcher() {
  const dispatch = useDispatch()
  const currentTheme = useSelector((state: RootState) => state.theme.theme)

  const handleClick = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    dispatch(setTheme(newTheme))
  }

  return (
    <button className="theme-switcher" onClick={handleClick}>
      {currentTheme === 'light' ? 'Dark theme' : 'Light theme'}
    </button>
  )
}
