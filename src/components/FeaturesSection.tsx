import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import { FaBoxes, FaBriefcase, FaCar, FaCarSide, FaCoins, FaHeadset, FaHome, FaLaptopCode, FaMobileAlt, FaShieldAlt, FaStore, FaSyncAlt, FaTheaterMasks, FaTools, FaUsers } from 'react-icons/fa'
import { features } from '../data/features'
import type { Language } from '../types'
import { translations } from '../i18n/translations'
import Card from './Card'
import SectionTitle from './SectionTitle'

interface FeaturesSectionProps {
  language: Language
}

const iconMap: Record<string, IconType> = {
  FaBriefcase,
  FaCoins,
  FaShieldAlt,
  FaStore,
  FaCarSide,
  FaHome,
  FaUsers,
  FaTheaterMasks,
  FaHeadset,
  FaSyncAlt,
  FaBoxes,
  FaMobileAlt,
  FaLaptopCode,
  FaCar,
  FaTools,
}

export default function FeaturesSection({ language }: FeaturesSectionProps) {
  const t = translations[language]
  return (
    <section id="features" className="section-scroll px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={t.sections.features} subtitle="A feature showcase that helps players understand what makes the city worth joining." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {features.map((feature, index) => {
            const FeatureIcon = iconMap[feature.icon] ?? FaBriefcase
            return (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.035 }}>
                <Card className="relative h-full overflow-hidden">
                  <span className="absolute left-0 top-8 h-12 w-1 rounded-full bg-black dark:bg-white opacity-40 transition group-hover:h-24 group-hover:opacity-100" />
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-black/10 dark:bg-black text-2xl text-black dark:text-white transition group-hover:scale-110 group-hover:shadow-mtGlow">
                    <FeatureIcon />
                  </div>
                  <h3 className="mt-5 text-xl font-black text-black dark:text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-black/75 transition group-hover:text-black/90 dark:text-white/60 dark:group-hover:text-white/90">{feature.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
