import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { announcements } from '../data/announcements'
import type { Announcement, Language } from '../types'
import { translations } from '../i18n/translations'
import Card from './Card'
import SectionTitle from './SectionTitle'

interface AnnouncementsSectionProps {
  language: Language
}

const priorities = ['All', 'Normal', 'Important', 'Maintenance', 'Event'] as const

const priorityClasses: Record<Announcement['priority'], string> = {
  Normal: 'bg-white text-black dark:bg-black dark:text-white border border-black/20 dark:border-white/20',
  Important: 'bg-black/5 dark:bg-black text-black dark:text-white shadow-mtSoft',
  Maintenance: 'bg-blue-500/10 text-blue-400',
  Event: 'bg-emerald-500/10 text-emerald-500',
}

export default function AnnouncementsSection({ language }: AnnouncementsSectionProps) {
  const t = translations[language]
  const [activePriority, setActivePriority] = useState<(typeof priorities)[number]>('All')
  const filtered = useMemo(() => (activePriority === 'All' ? announcements : announcements.filter((announcement) => announcement.priority === activePriority)), [activePriority])
  const latest = announcements[0]

  return (
    <section id="announcements" className="section-scroll px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={t.sections.announcements} subtitle="Timeline-style news cards with priority badges for events, maintenance, and important updates." />
        <Card className="mb-8 overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[.9fr_1.1fr]">
            {latest.image && <img src={latest.image} alt={latest.title} className="h-full min-h-72 w-full object-cover" />}
            <div className="p-7">
              <span className="rounded-full bg-black/5 dark:bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-black dark:text-white">{t.labels.latest}</span>
              <h3 className="mt-4 text-3xl font-black text-black dark:text-white">{latest.title}</h3>
              <p className="mt-2 text-sm font-bold text-black/60">{latest.date} • {latest.author}</p>
              <p className="mt-5 leading-8 text-black/75 dark:text-white/80">{latest.description}</p>
            </div>
          </div>
        </Card>
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {priorities.map((priority) => (
            <button key={priority} onClick={() => setActivePriority(priority)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition ${activePriority === priority ? 'bg-black text-white dark:bg-white dark:text-black shadow-mtGlow' : 'border border-black/25 bg-white dark:border-white/25 dark:bg-black text-black/85 hover:border-black/45 dark:hover:border-white/50 hover:text-black dark:hover:text-white dark:text-white/80'}`}>
              {priority === 'All' ? t.labels.all : priority}
            </button>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((announcement, index) => (
            <motion.div key={announcement.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.06 }}>
              <Card className="h-full overflow-hidden p-0">
                {announcement.image && <img src={announcement.image} alt={announcement.title} className="h-48 w-full object-cover transition duration-700 group-hover:scale-105" />}
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${priorityClasses[announcement.priority]}`}>{announcement.priority}</span>
                    <span className="rounded-full border border-black/20 bg-white px-3 py-1 text-xs font-bold text-black dark:border-white/20 dark:bg-black dark:text-white">{announcement.category}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-black text-black dark:text-white">{announcement.title}</h3>
                  <p className="mt-2 text-xs font-bold text-black/60">{announcement.date} • {announcement.author}</p>
                  <p className="mt-4 text-sm leading-7 text-black/75 dark:text-white/80">{announcement.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
