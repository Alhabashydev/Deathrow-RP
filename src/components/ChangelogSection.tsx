import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'
import { changelog } from '../data/changelog'
import type { ChangelogItem, Language } from '../types'
import { translations } from '../i18n/translations'
import Card from './Card'
import SectionTitle from './SectionTitle'

interface ChangelogSectionProps {
  language: Language
}

type ChangeFilter = 'All' | 'Added' | 'Removed' | 'Changed'

const filters: ChangeFilter[] = ['All', 'Added', 'Removed', 'Changed']

const changeConfig: Record<Exclude<ChangeFilter, 'All'>, { className: string; keyName: keyof Pick<ChangelogItem, 'added' | 'removed' | 'changed'> }> = {
  Added: { className: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-500', keyName: 'added' },
  Removed: { className: 'border-red-500/25 bg-red-500/10 text-red-500', keyName: 'removed' },
  Changed: { className: 'border-blue-500/25 bg-blue-500/10 text-blue-500', keyName: 'changed' },
}

export default function ChangelogSection({ language }: ChangelogSectionProps) {
  const t = translations[language]
  const [activeFilter, setActiveFilter] = useState<ChangeFilter>('All')
  const [openVersion, setOpenVersion] = useState<string | null>(changelog[0]?.version ?? null)

  const visibleChangelog = useMemo(() => {
    if (activeFilter === 'All') return changelog
    const key = changeConfig[activeFilter].keyName
    return changelog.filter((entry) => entry[key].length > 0)
  }, [activeFilter])

  useEffect(() => {
    if (!visibleChangelog.length) {
      setOpenVersion(null)
      return
    }

    const isCurrentVisible = visibleChangelog.some((entry) => entry.version === openVersion)
    if (!isCurrentVisible) setOpenVersion(visibleChangelog[0].version)
  }, [openVersion, visibleChangelog])

  const labels = {
    All: t.labels.all,
    Added: 'Added',
    Removed: 'Removed',
    Changed: 'Changed',
  }

  const renderList = (label: Exclude<ChangeFilter, 'All'>, items: string[]) => {
    if (activeFilter !== 'All' && activeFilter !== label) return null
    if (!items.length) return null

    return (
      <div className="min-w-0 rounded-3xl border border-black/20 bg-white dark:border-white/20 dark:bg-black p-4 dark:border-white/20 dark:bg-black">
        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-widest ${changeConfig[label].className}`}>{label}</span>
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li key={`${label}-${item}`} className="rounded-2xl border border-black/20 bg-white dark:border-white/20 dark:bg-black p-3 text-sm font-semibold leading-6 text-black/75 dark:border-white/20 dark:bg-black dark:text-white/80">
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const listColumnClass = activeFilter === 'All' ? 'md:grid-cols-3' : 'md:grid-cols-1'

  return (
    <section id="changelog" className="section-scroll px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionTitle title={t.sections.changelog} subtitle="Clean timeline for added, removed, and changed server updates." />

        <div className="mb-8 flex justify-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`h-9 shrink-0 rounded-md px-4 text-sm font-black transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-black text-white shadow-[0_0_24px_rgba(0,0,0,.14)] dark:bg-white dark:text-black dark:shadow-[0_0_24px_rgba(255,255,255,.16)]'
                  : 'border border-black/25 bg-white text-black/75 hover:bg-black/10 hover:text-black dark:border-white/20 dark:bg-black dark:text-white/80 dark:hover:bg-white dark:hover:text-black dark:hover:text-white'
              }`}
            >
              {labels[filter]}
            </button>
          ))}
        </div>

        {visibleChangelog.length === 0 ? (
          <Card hover={false} className="text-center text-black/75 dark:text-white/80">No changelog entries found.</Card>
        ) : (
          <div className="relative space-y-5 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-black/10 dark:before:bg-white/15 rtl:before:left-auto rtl:before:right-4">
            {visibleChangelog.map((entry, index) => {
              const isOpen = openVersion === entry.version
              return (
                <motion.div
                  key={entry.version}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.04 }}
                  className="relative pl-12 rtl:pl-0 rtl:pr-12"
                >
                  <span className="absolute left-0 top-7 h-8 w-8 rounded-full border-4 border-white bg-black shadow-[0_0_24px_rgba(0,0,0,.18)] dark:border-black dark:bg-white dark:shadow-[0_0_24px_rgba(255,255,255,.16)] rtl:left-auto rtl:right-0" />
                  <Card hover={false} className="overflow-hidden p-0">
                    <button
                      type="button"
                      onClick={() => setOpenVersion(isOpen ? null : entry.version)}
                      className="flex w-full items-center justify-between gap-4 p-6 text-start transition hover:bg-white dark:hover:bg-white/[0.035]"
                    >
                      <div className="min-w-0">
                        <span className="inline-flex rounded-md bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-white dark:bg-white dark:text-black">{entry.version}</span>
                        <h3 className="mt-3 text-2xl font-black text-black dark:text-white">{entry.title}</h3>
                        <p className="mt-1 text-sm font-bold text-black/60 dark:text-white/60">{entry.date}</p>
                      </div>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="shrink-0 rounded-md border border-black/25 bg-white p-3 text-black dark:border-white/20 dark:bg-black dark:text-white">
                        <FaChevronDown />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className={`grid gap-4 border-t border-black/5 p-6 dark:border-white/20 ${listColumnClass}`}>
                            {renderList('Added', entry.added)}
                            {renderList('Removed', entry.removed)}
                            {renderList('Changed', entry.changed)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
