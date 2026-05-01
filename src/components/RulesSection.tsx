import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaChevronDown, FaSearch } from 'react-icons/fa'
import { rules } from '../data/rules'
import type { Language, RuleItem } from '../types'
import { translations } from '../i18n/translations'
import Card from './Card'
import SectionTitle from './SectionTitle'

interface RulesSectionProps {
  language: Language
}

const severityClasses: Record<RuleItem['severity'], string> = {
  Low: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  Medium: 'bg-black/10 text-black/75 dark:text-white/80 border-black/20',
  High: 'bg-black/5 dark:bg-black text-black dark:text-white border-black/15 dark:border-white/20',
  Critical: 'bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_25px_rgba(239,68,68,.16)]',
}

export default function RulesSection({ language }: RulesSectionProps) {
  const t = translations[language]
  const [activeCategory, setActiveCategory] = useState(rules[0]?.category ?? '')
  const [search, setSearch] = useState('')
  const [openRule, setOpenRule] = useState<string | null>(null)

  const visibleRules = useMemo(() => {
    const query = search.trim().toLowerCase()
    const category = rules.find((item) => item.category === activeCategory)
    const source = query ? rules.flatMap((group) => group.items.map((item) => ({ ...item, category: group.category }))) : category?.items.map((item) => ({ ...item, category: activeCategory })) ?? []
    return source.filter((item) => `${item.number} ${item.title} ${item.description} ${item.severity} ${item.category}`.toLowerCase().includes(query))
  }, [activeCategory, search])

  return (
    <section id="rules" className="section-scroll px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={t.sections.rules} subtitle="Tabbed categories, searchable rules, animated accordions, severity badges, and punishment notes." />
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
          <Card hover={false}>
            <label className="relative block" aria-label={t.labels.searchRules}>
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/45 rtl:left-auto rtl:right-4" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t.labels.searchRules}
                className="w-full rounded-2xl border border-black/25 bg-white dark:border-white/25 dark:bg-black py-4 pl-12 pr-4 text-black outline-none transition placeholder:text-black/55 focus:border-black/50 dark:focus:border-white/70 focus:shadow-mtGlow dark:bg-black dark:text-white rtl:pl-4 rtl:pr-12"
              />
            </label>
            <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
              {rules.map((category) => (
                <button
                  key={category.category}
                  onClick={() => {
                    setActiveCategory(category.category)
                    setOpenRule(null)
                  }}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition ${activeCategory === category.category && !search ? 'bg-black text-white dark:bg-white dark:text-black shadow-mtGlow' : 'border border-black/25 bg-white dark:border-white/25 dark:bg-black text-black/85 hover:border-black/45 dark:hover:border-white/50 hover:text-black dark:hover:text-white dark:text-white/80'}`}
                >
                  {category.category}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              {visibleRules.length === 0 && <p className="rounded-2xl border border-black/25 bg-white dark:border-white/25 dark:bg-black p-5 text-center font-bold text-black/60">{t.labels.empty}</p>}
              {visibleRules.map((rule) => {
                const id = `${rule.number}-${rule.title}`
                const isOpen = openRule === id
                return (
                  <div key={id} className="rounded-3xl border border-black/25 bg-white dark:border-white/25 dark:bg-black transition hover:border-black/45 dark:hover:border-white/50 dark:bg-black">
                    <button onClick={() => setOpenRule(isOpen ? null : id)} className="flex w-full items-center justify-between gap-4 p-5 text-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-black/5 dark:bg-black px-3 py-1 text-xs font-black text-black dark:text-white">{rule.number}</span>
                          <span className={`rounded-full border px-3 py-1 text-xs font-black ${severityClasses[rule.severity]}`}>{rule.severity}</span>
                        </div>
                        <h3 className="mt-3 text-lg font-black text-black dark:text-white">{rule.title}</h3>
                      </div>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-black dark:text-white">
                        <FaChevronDown />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="border-t border-white/20 p-5 pt-4 text-sm leading-7 text-black/75 dark:text-white/80">
                            <p>{rule.description}</p>
                            {rule.punishment && <p className="mt-3 rounded-2xl bg-red-500/10 p-3 font-bold text-red-400">Punishment: {rule.punishment}</p>}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
