import '../../styles/theme-switcher.css'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../features/theme/themeSlice'
import type { RootState } from '../../store/store'

export default function ThemeSwitcher() {
  const dispatch = useDispatch()
  const currentTheme = useSelector((state: RootState) => state.theme.mode)

  const handleClick = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    dispatch(setTheme(newTheme))
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(newTheme)
  }

  return (
    <button className="theme-switcher" onClick={handleClick} name="switcher">
      {currentTheme === 'light' ? 'Dark theme' : 'Light theme'}
    </button>
  )
}
