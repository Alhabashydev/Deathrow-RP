import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaChevronDown, FaDiscord, FaSearch } from 'react-icons/fa'
import { serverConfig } from '../config/server'
import { faqs } from '../data/faq'
import type { Language } from '../types'
import { translations } from '../i18n/translations'
import Button from './Button'
import Card from './Card'
import SectionTitle from './SectionTitle'

interface FAQSectionProps {
  language: Language
}

export default function FAQSection({ language }: FAQSectionProps) {
  const t = translations[language]
  const [search, setSearch] = useState('')
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqs[0]?.question ?? null)

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase()
    return faqs.filter((faq) => `${faq.question} ${faq.answer}`.toLowerCase().includes(query))
  }, [search])

  return (
    <section id="faq" className="section-scroll px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionTitle title={t.sections.faq} subtitle="Fast answers for common joining, support, rules, department, and connection questions." />
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
          <Card hover={false}>
            <label className="relative block" aria-label={t.labels.searchFaq}>
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/45 rtl:left-auto rtl:right-4" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t.labels.searchFaq}
                className="w-full rounded-2xl border border-black/25 bg-white dark:border-white/25 dark:bg-black py-4 pl-12 pr-4 text-black outline-none transition placeholder:text-black/55 focus:border-black/50 dark:focus:border-white/70 focus:shadow-mtGlow dark:bg-black dark:text-white rtl:pl-4 rtl:pr-12"
              />
            </label>
            <div className="mt-6 space-y-3">
              {filteredFaqs.length === 0 && <p className="rounded-2xl border border-black/25 bg-white dark:border-white/25 dark:bg-black p-5 text-center font-bold text-black/60">{t.labels.empty}</p>}
              {filteredFaqs.map((faq) => {
                const isOpen = openQuestion === faq.question
                return (
                  <div key={faq.question} className="rounded-3xl border border-black/25 bg-white dark:border-white/25 dark:bg-black transition hover:border-black/45 dark:hover:border-white/50 dark:bg-black">
                    <button onClick={() => setOpenQuestion(isOpen ? null : faq.question)} className="flex w-full items-center justify-between gap-4 p-5 text-start">
                      <h3 className={`text-lg font-black transition ${isOpen ? 'text-black dark:text-white' : 'text-black dark:text-white'}`}>{faq.question}</h3>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-black dark:text-white">
                        <FaChevronDown />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <p className="border-t border-white/20 p-5 pt-4 text-sm leading-7 text-black/75 dark:text-white/80">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
            <div className="mt-6 rounded-3xl border border-black/15 dark:border-white/20 bg-black/5 dark:bg-black p-5 text-center">
              <p className="mb-4 font-bold text-black/85 dark:text-white/90">Still need help? Open a support ticket in Discord.</p>
              <Button href={serverConfig.supportUrl} variant="discord" icon={<FaDiscord />}>
                {t.buttons.support}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
