import type { HTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
}

export default function Card({ children, className = '', hover = true, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -6, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`group rounded-2xl border border-black/20 bg-white p-6 shadow-[0_18px_80px_rgba(0,0,0,.18)] backdrop-blur-xl transition-all duration-300 hover:border-black hover:shadow-[0_22px_90px_rgba(0,0,0,.24)] dark:border-white/20 dark:bg-black dark:hover:border-white dark:hover:shadow-[0_0_44px_rgba(255,255,255,.16)] ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
