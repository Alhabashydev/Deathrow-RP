import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaBars, FaChevronDown, FaGamepad, FaTimes } from 'react-icons/fa'
import { getConnectUrl, serverConfig } from '../config/server'
import type { Language, Theme } from '../types'
import { translations } from '../i18n/translations'
import Button from './Button'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'

interface NavbarProps {
  language: Language
  onLanguageChange: (language: Language) => void
  theme: Theme
  onThemeToggle: () => void
}

const primaryNavItems = [
  { id: 'home', key: 'home' },
  { id: 'status', key: 'status' },
  { id: 'team', key: 'team' },
  { id: 'jobs', key: 'jobs' },
  { id: 'features', key: 'features' },
  { id: 'rules', key: 'rules' },
  { id: 'gallery', key: 'gallery' },
] as const

const secondaryNavItems = [
  { id: 'about', key: 'about' },
  { id: 'announcements', key: 'announcements' },
  { id: 'guide', key: 'guide' },
  { id: 'faq', key: 'faq' },
  { id: 'changelog', key: 'changelog' },
  { id: 'partners', key: 'partners' },
  { id: 'support', key: 'support' },
] as const

const navItems = [...primaryNavItems, ...secondaryNavItems]

type NavItem = (typeof navItems)[number]

export default function Navbar({ language, onLanguageChange, theme, onThemeToggle }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const t = translations[language]

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10)
      const sections = navItems
        .map((item) => document.getElementById(item.id))
        .filter((section): section is HTMLElement => Boolean(section))

      const current = sections.reduce<HTMLElement | null>((active, section) => {
        const top = section.getBoundingClientRect().top
        return top <= 120 ? section : active
      }, null)

      if (current) setActiveId(current.id)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const closeMenus = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('[data-navbar-more]')) setMoreOpen(false)
    }

    window.addEventListener('click', closeMenus)
    return () => window.removeEventListener('click', closeMenus)
  }, [])

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (!section) return

    const top = section.getBoundingClientRect().top + window.scrollY - 82
    window.scrollTo({ top, behavior: 'smooth' })
    setIsOpen(false)
    setMoreOpen(false)
  }

  const linkClass = (item: NavItem) => {
    const active = activeId === item.id
    return [
      'relative inline-flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-semibold transition-all duration-200',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
      active
        ? 'bg-black text-white shadow-[0_0_24px_rgba(0,0,0,.18)] dark:bg-white dark:text-black dark:shadow-[0_0_28px_rgba(255,255,255,.18)]'
        : 'text-black hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black',
    ].join(' ')
  }

  const navLink = (item: NavItem) => (
    <button key={item.id} type="button" onClick={() => scrollToSection(item.id)} className={linkClass(item)}>
      {t.nav[item.key]}
    </button>
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <motion.nav
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-300 ${
          isScrolled
            ? 'border-black/25 bg-white/95 shadow-[0_18px_70px_rgba(0,0,0,.18)] backdrop-blur-2xl dark:border-white/20 dark:bg-black'
            : 'border-black/25 bg-white backdrop-blur-xl dark:border-white/20 dark:bg-black/45'
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-3 px-3 sm:px-4">
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="group flex min-w-0 items-center gap-3 rounded-xl pr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Go to home section"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-black/25 bg-white shadow-sm transition group-hover:scale-[1.03] dark:border-white/20 dark:bg-black">
              <img src="/logo.svg" alt={`${serverConfig.serverName} logo`} className="h-10 w-10 object-contain" />
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-sm font-black uppercase tracking-[0.2em] text-black dark:text-white">{serverConfig.serverName}</span>
              <span className="block truncate text-[11px] font-semibold uppercase tracking-[0.22em] text-black dark:text-white">Roleplay Hub</span>
            </span>
          </button>

          <div className="hidden flex-1 items-center justify-center gap-1 xl:flex">
            <div className="flex max-w-[760px] items-center gap-1 overflow-x-auto rounded-xl border border-black/20 bg-white p-1 dark:border-white/20 dark:bg-black backdrop-blur hide-scrollbar">
              {primaryNavItems.map(navLink)}
              <div data-navbar-more className="relative">
                <button type="button" onClick={() => setMoreOpen((value) => !value)} className={linkClass({ id: 'more', key: 'support' } as NavItem)}>
                  More <FaChevronDown className={`ml-2 text-[10px] transition ${moreOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {moreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      className="absolute right-0 top-11 z-50 grid w-56 gap-1 rounded-2xl border border-black/25 bg-white p-2 shadow-[0_24px_90px_rgba(0,0,0,.22)] backdrop-blur-2xl dark:border-white/20 dark:bg-black"
                    >
                      {secondaryNavItems.map(navLink)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <LanguageSwitcher language={language} onChange={onLanguageChange} />
            <Button href={getConnectUrl()} variant="primary" icon={<FaGamepad />} className="h-9 min-w-[132px] px-4 py-2 text-sm">
              {t.buttons.connect}
            </Button>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <LanguageSwitcher language={language} onChange={onLanguageChange} />
            <button
              aria-label="Toggle mobile menu"
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-md border border-black/25 bg-white text-black transition hover:bg-black hover:text-white dark:border-white/25 dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            className="mx-auto mt-3 grid max-h-[78vh] max-w-7xl grid-cols-2 gap-2 overflow-y-auto rounded-2xl border border-black/25 bg-white p-3 shadow-[0_24px_100px_rgba(0,0,0,.24)] backdrop-blur-2xl dark:border-white/20 dark:bg-black sm:grid-cols-3"
          >
            {navItems.map(navLink)}
            <Button href={getConnectUrl()} variant="primary" icon={<FaGamepad />} className="col-span-2 sm:col-span-3">
              {t.buttons.connectServer}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
