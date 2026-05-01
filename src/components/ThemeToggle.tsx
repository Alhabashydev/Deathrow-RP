import { FaMoon, FaSun } from 'react-icons/fa'
import type { Theme } from '../types'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'
  return (
    <button
      aria-label="Toggle theme"
      onClick={onToggle}
      className="grid h-10 w-10 place-items-center rounded-full border border-black/25 bg-white text-black shadow-[0_12px_34px_rgba(0,0,0,.14)] transition hover:bg-black hover:text-white dark:border-white/25 dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  )
}
