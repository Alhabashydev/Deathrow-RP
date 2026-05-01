import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaBolt, FaGamepad, FaRedo, FaServer, FaUsers } from 'react-icons/fa'
import { getConnectUrl } from '../config/server'
import { fallbackStatus, fetchFiveMStatus } from '../services/fivemStatus'
import type { Language, ServerStatus as ServerStatusType } from '../types'
import { translations } from '../i18n/translations'
import Button from './Button'
import Card from './Card'
import SectionTitle from './SectionTitle'

interface ServerStatusProps {
  language: Language
}

export default function ServerStatus({ language }: ServerStatusProps) {
  const t = translations[language]
  const [status, setStatus] = useState<ServerStatusType>(fallbackStatus)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadStatus = async () => {
    setLoading(true)
    setError(false)
    try {
      const data = await fetchFiveMStatus()
      setStatus(data)
    } catch {
      setStatus({ ...fallbackStatus, online: false, lastUpdated: new Date().toLocaleTimeString() })
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadStatus()
  }, [])

  const stats = [
    { icon: <FaUsers />, label: t.labels.onlinePlayers, value: `${status.players}/${status.maxPlayers}` },
    { icon: <FaServer />, label: 'CFX', value: status.cfxCode },
    { icon: <FaBolt />, label: t.labels.queue, value: status.queue.toString() },
    { icon: <FaRedo />, label: t.labels.restart, value: status.restartTime },
  ]

  return (
    <section id="status" className="section-scroll px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={t.sections.serverStatus} subtitle="Live status cards with safe fallback data when the FiveM API is unavailable or blocked by CORS." />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="relative overflow-hidden p-6 md:p-8">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-black/10 dark:bg-white/20 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`h-3 w-3 rounded-full ${status.online ? 'bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,.8)]' : 'bg-red-500 shadow-[0_0_18px_rgba(239,68,68,.7)]'}`} />
                  <span className="rounded-full border border-black/25 bg-white dark:border-white/25 dark:bg-black px-3 py-1 text-sm font-black text-black/90 dark:text-white">
                    {loading ? t.labels.loading : status.online ? 'Online' : 'Offline / Fallback'}
                  </span>
                  {error && <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-bold text-blue-400">API fallback active</span>}
                </div>
                <h3 className="mt-5 text-3xl font-black text-black dark:text-white">{status.serverName}</h3>
                <p className="mt-3 text-black/75 dark:text-white/80">Server IP: <span className="font-bold text-black dark:text-white">{status.serverIp}</span></p>
                <p className="mt-2 text-black/75 dark:text-white/80">{t.labels.version}: <span className="font-bold text-black dark:text-white">{status.version}</span></p>
                <p className="mt-2 text-sm text-black/60 dark:text-white/60">{t.labels.lastUpdated}: {status.lastUpdated}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button href={getConnectUrl()} icon={<FaGamepad />}>
                    {t.buttons.connectServer}
                  </Button>
                  <Button onClick={() => void loadStatus()} icon={<FaRedo />} variant="ghost" disabled={loading}>
                    {t.buttons.refresh}
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.06 }}
                    className="rounded-[1.7rem] border border-black/25 bg-white dark:border-white/25 dark:bg-black p-5 transition hover:border-black/45 dark:hover:border-white/50 hover:bg-black/5 dark:hover:bg-white dark:hover:text-black dark:bg-black"
                  >
                    <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-black/10 dark:bg-black text-black dark:text-white shadow-mtSoft">{stat.icon}</div>
                    <p className="text-2xl font-black text-black dark:text-white">{stat.value}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-black/60">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
