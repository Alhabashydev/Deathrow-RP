import { motion } from 'framer-motion'
import { FaBullseye, FaCrown, FaEye, FaUsers } from 'react-icons/fa'
import { aboutContent } from '../data/about'
import type { Language } from '../types'
import { translations } from '../i18n/translations'
import Card from './Card'
import SectionTitle from './SectionTitle'

interface AboutSectionProps {
  language: Language
}

export default function AboutSection({ language }: AboutSectionProps) {
  const t = translations[language]
  return (
    <section id="about" className="section-scroll px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={t.sections.about} subtitle="Tell players what your city stands for, why it exists, and why they should stay." />
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_.9fr]">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
            <Card className="h-full">
              <div className="mb-5 inline-flex rounded-full bg-black/5 dark:bg-black px-4 py-2 text-xs font-black uppercase tracking-[0.3em] text-black dark:text-white">Server Story</div>
              <h3 className="text-3xl font-black text-black dark:text-white">Built for serious RP, smooth systems, and a better community.</h3>
              <div className="mt-6 space-y-5 text-sm leading-8 text-black/75 dark:text-white/80">
                <p>{aboutContent.story}</p>
                <p>{aboutContent.difference}</p>
                <p>{aboutContent.community}</p>
                <p>{aboutContent.roleplayQuality}</p>
              </div>
            </Card>
          </motion.div>
          <div className="grid gap-5">
            {[
              { icon: <FaBullseye />, title: 'Mission', text: aboutContent.mission },
              { icon: <FaEye />, title: 'Vision', text: aboutContent.vision },
              { icon: <FaUsers />, title: 'Community', text: aboutContent.community },
            ].map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08 }}>
                <Card className="flex gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-black/10 dark:bg-black text-2xl text-black dark:text-white shadow-mtSoft">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-black text-black dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-black/75 dark:text-white/80">{item.text}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.06 }}>
              <Card className="text-center">
                <FaCrown className="mx-auto text-2xl text-black dark:text-white" />
                <p className="mt-3 text-3xl font-black text-black dark:text-white">{stat.value}</p>
                <p className="mt-1 text-xs font-black uppercase tracking-widest text-black/60">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
