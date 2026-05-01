import type { MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaChevronRight, FaDiscord, FaGamepad, FaPlay, FaSignal } from 'react-icons/fa'
import { getConnectUrl, serverConfig } from '../config/server'
import type { Language } from '../types'
import { translations } from '../i18n/translations'
import Button from './Button'

interface HeroProps {
  language: Language
}

const previewCards = [
  { title: 'City Patrol', image: '/gallery/police-1.svg', href: '#gallery', rotate: -2, y: -10 },
  { title: 'Public Jobs', image: '/gallery/jobs-1.svg', href: '#jobs', rotate: 2, y: 12 },
  { title: 'Community Events', image: '/gallery/events-1.svg', href: '#announcements', rotate: 1, y: -3 },
]

export default function Hero({ language }: HeroProps) {
  const t = translations[language]
  const quickStats = [
    { label: t.labels.onlinePlayers, value: '120' },
    { label: t.labels.maxPlayers, value: '256' },
    { label: t.labels.discordMembers, value: '8.4K' },
    { label: t.labels.uptime, value: '99.9%' },
  ]

  const scrollToJobs = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="home" className="section-scroll relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.13),transparent_30rem),radial-gradient(circle_at_80%_70%,rgba(255,255,255,.09),transparent_28rem)]" />
        <div className="absolute inset-0 bg-black/0 dark:bg-black" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white via-white to-transparent dark:from-[#030303] dark:via-[#030303]/85" />
      </div>

      <div className="container relative z-10 mx-auto grid h-full max-w-7xl items-center gap-12 py-20 md:grid-cols-[1.05fr_.95fr]">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="text-center md:text-start">
          <div className="mb-7 inline-flex items-center gap-2 rounded-md border border-black/25 bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-black shadow-sm backdrop-blur-xl dark:border-white/20 dark:bg-black dark:text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,.85)]" />
            <FaSignal /> {t.labels.liveServer}
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-black leading-[0.92] tracking-tight text-black drop-shadow-sm dark:text-white sm:text-7xl lg:mx-0 lg:text-8xl">
            Premium <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-black via-black/85 to-black/60 bg-clip-text text-transparent dark:from-white dark:via-white/90 dark:to-white/60">FiveM RP</span>
          </h1>

          <p className="mt-6 text-lg font-black uppercase tracking-[0.22em] text-black dark:text-white">{serverConfig.serverName}</p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-black/75 dark:text-white/80 md:mx-0">{serverConfig.description}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-2.5 md:justify-start">
            <Button href={getConnectUrl()} target="_self" icon={<FaGamepad />} variant="primary" className="min-w-[132px]">
              {t.buttons.connectServer} <FaArrowRight />
            </Button>
            <Button href={serverConfig.discordUrl} icon={<FaDiscord />} variant="ghost" className="min-w-[124px]">
              {t.buttons.joinDiscord}
            </Button>
            <Button href="#jobs" target="_self" icon={<FaPlay />} variant="ghost" onClick={scrollToJobs} className="min-w-[108px]">
              {t.buttons.viewJobs}
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.06 }}
                className="rounded-xl border border-black/25 bg-white p-4 text-start shadow-sm backdrop-blur-xl dark:border-white/20 dark:bg-black"
              >
                <p className="text-2xl font-black text-black dark:text-white">{stat.value}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-black/60 dark:text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="relative hidden min-h-[560px] md:block">
          {previewCards.map((card, index) => (
            <motion.a
              key={card.title}
              href={card.href}
              initial={{ opacity: 0, filter: 'blur(8px)', y: 38 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ delay: 0.18 + index * 0.12, duration: 0.6 }}
              whileHover={{ y: card.y - 8, scale: 1.025, rotate: card.rotate * 0.55 }}
              className={`group absolute left-0 right-0 mx-auto block w-[88%] overflow-hidden rounded-2xl border border-white/20 bg-black/30 shadow-[0_28px_90px_rgba(0,0,0,.42)] backdrop-blur-sm transition-colors hover:border-white/40 ${index === 0 ? 'top-6' : index === 1 ? 'top-48 ml-10' : 'top-[22rem] -ml-8'}`}
              style={{ rotate: card.rotate, y: card.y }}
            >
              <div className="relative aspect-video overflow-hidden bg-black">
                <img src={card.image} alt={card.title} className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.12] to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/20 bg-black/45 px-4 py-3 text-white backdrop-blur-xl">
                  <span className="font-black">{card.title}</span>
                  <FaChevronRight className="transition group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <motion.button
        type="button"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        onClick={() => document.getElementById('status')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center text-xs font-bold uppercase tracking-[0.24em] text-black/60 transition hover:text-black dark:text-white/60 dark:hover:text-white md:flex"
      >
        Scroll to discover more
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <FaChevronRight className="mt-2 rotate-90 text-2xl" />
        </motion.span>
      </motion.button>
    </section>
  )
}
