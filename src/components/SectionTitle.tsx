import { motion } from 'framer-motion'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionTitle({ eyebrow, title, subtitle, align = 'center' }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className={`mx-auto mb-12 max-w-3xl ${align === 'center' ? 'text-center' : 'text-start'}`}
    >
      {eyebrow && <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-black dark:text-white">{eyebrow}</p>}
      <h2 className="text-3xl font-black tracking-tight text-black dark:text-white sm:text-5xl">
        {title.split(' ').slice(0, -1).join(' ')} <span className="bg-gradient-to-r from-black to-black/60 dark:from-white dark:to-white/55 bg-clip-text text-transparent">{title.split(' ').slice(-1)}</span>
      </h2>
      {subtitle && <p className="mt-4 text-base leading-8 text-black/75 dark:text-white/80">{subtitle}</p>}
    </motion.div>
  )
}
