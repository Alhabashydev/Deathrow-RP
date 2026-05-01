import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaDiscord, FaGlobe, FaInstagram, FaSearch, FaTiktok, FaYoutube } from 'react-icons/fa'
import { partners } from '../data/partners'
import type { Language, Partner, SocialLinks } from '../types'
import { translations } from '../i18n/translations'
import Button from './Button'
import Card from './Card'
import SectionTitle from './SectionTitle'

interface PartnersSectionProps {
  language: Language
}

type PartnerFilter = 'All' | 'Community' | 'Streamer' | 'Creator' | 'Sponsor' | 'Developer' | 'Discord'

const filters: PartnerFilter[] = ['All', 'Community', 'Streamer', 'Creator', 'Sponsor', 'Developer', 'Discord']

const matchesFilter = (partner: Partner, filter: PartnerFilter) => {
  if (filter === 'All') return true
  if (filter === 'Community') return partner.type === 'Community Partner'
  if (filter === 'Creator') return partner.type === 'Content Creator'
  if (filter === 'Developer') return partner.type === 'Developer Partner'
  if (filter === 'Discord') return partner.type === 'Discord Partner'
  return partner.type === filter
}

const socialIcon = (key: keyof SocialLinks) => {
  const icons = {
    discord: <FaDiscord />,
    instagram: <FaInstagram />,
    tiktok: <FaTiktok />,
    youtube: <FaYoutube />,
    website: <FaGlobe />,
  }
  return icons[key]
}

export default function PartnersSection({ language }: PartnersSectionProps) {
  const t = translations[language]
  const [activeFilter, setActiveFilter] = useState<PartnerFilter>('All')
  const [search, setSearch] = useState('')

  const filteredPartners = useMemo(() => {
    const query = search.trim().toLowerCase()
    return partners.filter((partner) => matchesFilter(partner, activeFilter)).filter((partner) => `${partner.name} ${partner.type} ${partner.description}`.toLowerCase().includes(query))
  }, [activeFilter, search])

  return (
    <section id="partners" className="section-scroll px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={t.sections.serverPartners} subtitle={t.sections.partnersSubtitle} />
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="relative block" aria-label={t.labels.searchPartners}>
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/45 rtl:left-auto rtl:right-4" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t.labels.searchPartners}
              className="w-full rounded-full border border-black/25 bg-white dark:border-white/25 dark:bg-black py-4 pl-12 pr-4 text-black outline-none backdrop-blur transition placeholder:text-black/55 focus:border-black/50 dark:focus:border-white/70 focus:shadow-mtGlow dark:bg-black dark:text-white rtl:pl-4 rtl:pr-12"
            />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {filters.map((filter) => (
              <button key={filter} onClick={() => setActiveFilter(filter)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition ${activeFilter === filter ? 'bg-black text-white dark:bg-white dark:text-black shadow-mtGlow' : 'border border-black/25 bg-white dark:border-white/25 dark:bg-black text-black/85 hover:border-black/45 dark:hover:border-white/50 hover:text-black dark:hover:text-white dark:text-white/80'}`}>
                {filter === 'All' ? t.labels.all : filter}
              </button>
            ))}
          </div>
        </motion.div>
        {filteredPartners.length === 0 ? (
          <Card className="text-center" hover={false}>
            <p className="font-bold text-black/60">{t.labels.empty}</p>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPartners.map((partner, index) => (
              <motion.div key={partner.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.06 }}>
                <Card className="h-full text-center">
                  <div className="mx-auto mb-5 h-24 w-24 overflow-hidden rounded-[2rem] border border-black/15 dark:border-white/20 bg-black/5 dark:bg-black p-1 transition group-hover:border-black/50 dark:group-hover:border-white/70">
                    <img src={partner.image} alt={partner.name} className="h-full w-full rounded-[1.6rem] object-cover transition duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="rounded-full bg-black/5 dark:bg-black px-3 py-1 text-xs font-black text-black dark:text-white">{partner.type}</span>
                    {partner.verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-500 transition group-hover:shadow-[0_0_24px_rgba(16,185,129,.22)]">
                        <FaCheckCircle /> {t.labels.verifiedPartner}
                      </span>
                    )}
                  </div>
                  <a href={partner.url} target="_blank" rel="noreferrer" className="mt-4 block text-2xl font-black text-black transition hover:text-black dark:hover:text-white dark:text-white">
                    {partner.name}
                  </a>
                  <p className="mt-3 text-sm leading-7 text-black/75 dark:text-white/80">{partner.description}</p>
                  {partner.socials && (
                    <div className="mt-5 flex justify-center gap-2">
                      {Object.entries(partner.socials).map(([key, url]) => (
                        <a key={key} href={url} target="_blank" rel="noreferrer" aria-label={`${partner.name} ${key}`} className="grid h-10 w-10 place-items-center rounded-full border border-black/25 bg-white dark:border-white/25 dark:bg-black text-black/85 transition hover:scale-110 hover:border-black/50 dark:hover:border-white/60 hover:text-black dark:hover:text-white dark:text-white/90">
                          {socialIcon(key as keyof SocialLinks)}
                        </a>
                      ))}
                    </div>
                  )}
                  <Button href={partner.url} className="mt-6 w-full">
                    {t.buttons.visitPartner}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
