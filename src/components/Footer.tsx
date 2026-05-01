import { FaDiscord, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { serverConfig } from '../config/server'
import type { Language } from '../types'
import { translations } from '../i18n/translations'

interface FooterProps {
  language: Language
}

export default function Footer({ language }: FooterProps) {
  const t = translations[language]
  const socials = [
    { label: 'Instagram', icon: <FaInstagram />, url: serverConfig.instagramUrl },
    { label: 'TikTok', icon: <FaTiktok />, url: serverConfig.tiktokUrl },
    { label: 'Discord', icon: <FaDiscord />, url: serverConfig.discordUrl },
    { label: 'YouTube', icon: <FaYoutube />, url: serverConfig.youtubeUrl },
  ]

  return (
    <footer className="px-4 pb-8 pt-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-black/25 bg-white dark:border-white/25 dark:bg-black p-6 shadow-mtSoft backdrop-blur-xl dark:bg-black">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-start">
          <div className="flex items-center gap-4">
            <img src="/logo.svg" alt={`${serverConfig.serverName} logo`} className="h-14 w-14 rounded-2xl" />
            <div>
              <h3 className="text-xl font-black text-black dark:text-white">{serverConfig.serverName}</h3>
              <p className="mt-1 text-sm text-black/75 dark:text-white/80">{serverConfig.serverTagline}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {socials.map((social) => (
              <a key={social.label} href={social.url} target="_blank" rel="noreferrer" aria-label={social.label} className="grid h-11 w-11 place-items-center rounded-full border border-black/25 bg-white dark:border-white/25 dark:bg-black text-black/85 transition hover:scale-110 hover:border-black/50 dark:hover:border-white/60 hover:text-black dark:hover:text-white dark:text-white/90">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 border-t border-white/20 pt-5 text-center text-sm text-black/60">
          {t.labels.madeBy}{' '}
          <a href={serverConfig.portfolioUrl} target="_blank" rel="noreferrer" className="font-black text-black dark:text-white hover:underline">
            Alhabashy
          </a>
          <span className="mx-2">•</span>
          {t.labels.rights}
        </div>
      </div>
    </footer>
  )
}
