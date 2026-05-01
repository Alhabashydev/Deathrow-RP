import { motion } from 'framer-motion'
import { FaDiscord, FaGlobe, FaInstagram } from 'react-icons/fa'
import { teamMembers } from '../data/team'
import type { Language, SocialLinks } from '../types'
import { translations } from '../i18n/translations'
import Card from './Card'
import SectionTitle from './SectionTitle'

interface TeamSectionProps {
  language: Language
}

const socialIcon = (key: keyof SocialLinks) => {
  const icons = {
    discord: <FaDiscord />,
    instagram: <FaInstagram />,
    website: <FaGlobe />,
    tiktok: <FaGlobe />,
    youtube: <FaGlobe />,
  }
  return icons[key]
}

export default function TeamSection({ language }: TeamSectionProps) {
  const t = translations[language]
  return (
    <section id="team" className="section-scroll px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={t.sections.team} subtitle="Premium profile cards for owners, founders, developers, management, and staff leadership." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.06 }}
            >
              <Card className="h-full text-center">
                <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-[2rem] border border-black/15 dark:border-white/20 bg-black/5 dark:bg-black p-1 transition group-hover:border-black/50 dark:group-hover:border-white/70">
                  <img src={member.image} alt={member.name} className="h-full w-full rounded-[1.6rem] object-cover transition duration-500 group-hover:scale-110" />
                </div>
                <a href={member.portfolio} target="_blank" rel="noreferrer" className="relative text-xl font-black text-black transition after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-black dark:after:bg-white after:transition hover:text-black dark:hover:text-white hover:after:scale-x-100 dark:text-white">
                  {member.name}
                </a>
                <div className="mt-3 inline-flex rounded-full border border-black/20 dark:border-white/30 bg-black/5 dark:bg-black px-3 py-1 text-xs font-black uppercase tracking-widest text-black dark:text-white transition group-hover:shadow-mtGlow">
                  {member.role}
                </div>
                {member.status && <p className="mt-3 text-xs font-bold text-emerald-500">● {member.status}</p>}
                <p className="mt-4 text-sm leading-7 text-black/75 dark:text-white/80">{member.description}</p>
                {member.socials && (
                  <div className="mt-5 flex justify-center gap-2">
                    {Object.entries(member.socials).map(([key, url]) => (
                      <a key={key} href={url} target="_blank" rel="noreferrer" aria-label={`${member.name} ${key}`} className="grid h-10 w-10 place-items-center rounded-full border border-black/25 bg-white dark:border-white/25 dark:bg-black text-black/85 transition hover:scale-110 hover:border-black/50 dark:hover:border-white/60 hover:text-black dark:hover:text-white dark:text-white/90">
                        {socialIcon(key as keyof SocialLinks)}
                      </a>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
