import { useEffect, useState, useLayoutEffect } from "react"
import { THEME_KEYWORD, THEME_DARK, THEME_LIGHT } from "../constants"

function useTheme(): any {
  const [theme, setTheme] = useState<string>(localStorage.getItem(THEME_KEYWORD) ?? THEME_DARK)
  const [num, setNum] = useState<string>("0")
  console.log("THSTheme", theme)

  useEffect(() => {
    const THSTheme = localStorage.getItem(THEME_KEYWORD)
    if (THSTheme != null) {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem(THEME_KEYWORD, theme)
    }
  }, [theme])

  useLayoutEffect(() => {
      const th = theme === THEME_DARK ? THEME_LIGHT : THEME_DARK
      setTheme(th)
  }, [num])

  const toggleTheme = () => {
    setNum(+new Date() + "")
  }
  return [
    theme,
    toggleTheme
  ]
}
export default useTheme