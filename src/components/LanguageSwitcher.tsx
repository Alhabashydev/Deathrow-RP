import type { Language } from '../types'

interface LanguageSwitcherProps {
  language: Language
  onChange: (language: Language) => void
}

export default function LanguageSwitcher({ language, onChange }: LanguageSwitcherProps) {
  const nextLanguage: Language = language === 'en' ? 'ar' : 'en'
  return (
    <button
      aria-label="Change language"
      onClick={() => onChange(nextLanguage)}
      className="h-10 rounded-full border border-black/25 bg-white px-4 text-sm font-black text-black shadow-[0_12px_34px_rgba(0,0,0,.14)] transition hover:bg-black hover:text-white dark:border-white/25 dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
    >
      {language === 'en' ? 'EN' : 'AR'}
    </button>
  )
}
