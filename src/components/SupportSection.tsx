import { motion } from 'framer-motion'
import { FaBug, FaDiscord, FaExclamationTriangle, FaGavel, FaHandsHelping, FaHeart } from 'react-icons/fa'
import { serverConfig } from '../config/server'
import type { Language } from '../types'
import { translations } from '../i18n/translations'
import Button from './Button'
import Card from './Card'
import SectionTitle from './SectionTitle'

interface SupportSectionProps {
  language: Language
}

export default function SupportSection({ language }: SupportSectionProps) {
  const t = translations[language]
  return (
    <section id="support" className="section-scroll px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={t.sections.support} subtitle="Support actions for Discord, reports, ban appeals, bug reports, staff complaints, and donation support." />
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
          <Card className="relative overflow-hidden p-8 text-center md:p-12" hover={false}>
            <motion.div aria-hidden="true" animate={{ scale: [1, 1.16, 1], opacity: [0.45, 0.8, 0.45] }} transition={{ duration: 5, repeat: Infinity }} className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-black/10 dark:bg-white/20 blur-3xl" />
            <div className="relative">
              <h3 className="text-4xl font-black text-black dark:text-white">Need help inside the city?</h3>
              <p className="mx-auto mt-4 max-w-2xl leading-8 text-black/75 dark:text-white/80">Open the right support action so staff can handle your request faster. Good tickets include clear details, clips, screenshots, IDs, and timestamps.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Button href={serverConfig.supportUrl} variant="discord" icon={<FaDiscord />}>{t.buttons.support}</Button>
                <Button href={serverConfig.reportUrl} variant="danger" icon={<FaExclamationTriangle />}>{t.buttons.reportPlayer}</Button>
                <Button href={serverConfig.banAppealUrl} variant="info" icon={<FaGavel />}>{t.buttons.banAppeal}</Button>
                <Button href={serverConfig.bugReportUrl} variant="info" icon={<FaBug />}>{t.buttons.bugReport}</Button>
                <Button href={serverConfig.staffComplaintUrl} variant="danger" icon={<FaHandsHelping />}>{t.buttons.staffComplaint}</Button>
                <Button href={serverConfig.donationUrl} variant="success" icon={<FaHeart />}>{t.buttons.donate}</Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
