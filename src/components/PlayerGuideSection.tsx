import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import { FaBriefcase, FaCar, FaClipboardCheck, FaDollarSign, FaFileSignature, FaGamepad, FaHeadset, FaHome, FaMapSigns, FaMicrophone, FaUserEdit, FaWifi } from 'react-icons/fa'
import { serverConfig } from '../config/server'
import { playerGuide } from '../data/playerGuide'
import type { Language } from '../types'
import { translations } from '../i18n/translations'
import Button from './Button'
import Card from './Card'
import SectionTitle from './SectionTitle'

interface PlayerGuideSectionProps {
  language: Language
}

const iconMap: Record<string, IconType> = {
  FaGamepad,
  FaUserEdit,
  FaMapSigns,
  FaBriefcase,
  FaDollarSign,
  FaCar,
  FaHome,
  FaFileSignature,
  FaClipboardCheck,
  FaHeadset,
  FaWifi,
  FaMicrophone,
}

const checklistItems = ['Read the rules', 'Join Discord', 'Create character', 'Try a public job', 'Set voice chat', 'Ask support if stuck']

export default function PlayerGuideSection({ language }: PlayerGuideSectionProps) {
  const t = translations[language]
  const [checkedItems, setCheckedItems] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('new-player-checklist') ?? '[]') as string[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('new-player-checklist', JSON.stringify(checkedItems))
  }, [checkedItems])

  const toggleItem = (item: string) => {
    setCheckedItems((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]))
  }

  return (
    <section id="guide" className="section-scroll px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={t.sections.guide} subtitle="A beginner-friendly guide that turns your website into a real onboarding hub for new players." />
        <div className="mb-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <Card className="relative overflow-hidden">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-black/10 dark:bg-white/20 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-black dark:text-white">{t.labels.startHere}</p>
              <h3 className="mt-3 text-3xl font-black text-black dark:text-white">New to the city? Follow this first.</h3>
              <p className="mt-4 leading-8 text-black/75 dark:text-white/80">Read the basics, join Discord, set up voice chat, then start with a public job before applying for departments or businesses.</p>
              <Button href={serverConfig.discordUrl} variant="discord" className="mt-6">
                {t.buttons.joinDiscord}
              </Button>
            </div>
          </Card>
          <Card>
            <h3 className="text-xl font-black text-black dark:text-white">{t.labels.checklist}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {checklistItems.map((item) => (
                <label key={item} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-black/25 bg-white dark:border-white/25 dark:bg-black p-3 transition hover:border-black/45 dark:hover:border-white/50">
                  <input checked={checkedItems.includes(item)} onChange={() => toggleItem(item)} type="checkbox" className="h-5 w-5 accent-black dark:accent-white" />
                  <span className="font-bold text-black/85 dark:text-white/90">{item}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {playerGuide.map((item, index) => {
            const GuideIcon = iconMap[item.icon] ?? FaGamepad
            return (
              <motion.div key={item.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.04 }}>
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-black/10 dark:bg-black text-2xl text-black dark:text-white transition group-hover:scale-110 group-hover:shadow-mtGlow">
                      <GuideIcon />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-black dark:text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-black/75 dark:text-white/80">{item.description}</p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    {item.steps.map((step, stepIndex) => (
                      <div key={step} className="flex gap-3 rounded-2xl bg-white p-3 dark:bg-black">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-black text-xs font-black text-white dark:bg-white dark:text-black">{stepIndex + 1}</span>
                        <p className="text-sm font-medium text-black/75 dark:text-white/80">{step}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
