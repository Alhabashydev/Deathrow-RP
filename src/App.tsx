import { useEffect, useState } from 'react'
import AboutSection from './components/AboutSection'
import AnnouncementsSection from './components/AnnouncementsSection'
import ChangelogSection from './components/ChangelogSection'
import FAQSection from './components/FAQSection'
import FeaturesSection from './components/FeaturesSection'
import Footer from './components/Footer'
import GallerySection from './components/GallerySection'
import Hero from './components/Hero'
import JobsSection from './components/JobsSection'
import Navbar from './components/Navbar'
import PartnersSection from './components/PartnersSection'
import PlayerGuideSection from './components/PlayerGuideSection'
import RulesSection from './components/RulesSection'
import ServerStatus from './components/ServerStatus'
import SupportSection from './components/SupportSection'
import TeamSection from './components/TeamSection'
import { serverConfig } from './config/server'
import type { Language, Theme } from './types'

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme | null) ?? 'dark')
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('language') as Language | null) ?? 'en')

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
    localStorage.setItem('language', language)
  }, [language])

  useEffect(() => {
    document.title = serverConfig.serverName
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-black transition-colors duration-300 dark:bg-black dark:text-white">
      <Navbar language={language} onLanguageChange={setLanguage} theme={theme} onThemeToggle={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} />
      <main>
        <Hero language={language} />
        <ServerStatus language={language} />
        <TeamSection language={language} />
        <JobsSection language={language} />
        <FeaturesSection language={language} />
        <RulesSection language={language} />
        <GallerySection language={language} />
        <AboutSection language={language} />
        <AnnouncementsSection language={language} />
        <PlayerGuideSection language={language} />
        <FAQSection language={language} />
        <ChangelogSection language={language} />
        <PartnersSection language={language} />
        <SupportSection language={language} />
      </main>
      <Footer language={language} />
    </div>
  )
}
