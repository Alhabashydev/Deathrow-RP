import type { MouseEventHandler, ReactNode } from 'react'
import { motion } from 'framer-motion'

type ButtonVariant = 'primary' | 'success' | 'danger' | 'info' | 'discord' | 'ghost'

export interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  className?: string
  icon?: ReactNode
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  ariaLabel?: string
  onClick?: MouseEventHandler<HTMLElement>
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-black bg-black text-white shadow-[0_12px_34px_rgba(0,0,0,.22)] hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white dark:shadow-[0_0_34px_rgba(255,255,255,.14)]',
  success: 'border-emerald-500/70 bg-emerald-500 text-white shadow-[0_0_24px_rgba(34,197,94,.22)] hover:bg-emerald-600',
  danger: 'border-red-500/70 bg-red-500 text-white shadow-[0_0_24px_rgba(239,68,68,.22)] hover:bg-red-600',
  info: 'border-blue-500/70 bg-blue-500 text-white shadow-[0_0_24px_rgba(59,130,246,.22)] hover:bg-blue-600',
  discord:
    'border-black bg-black text-white hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white',
  ghost:
    'border-black/30 bg-white text-black hover:border-black hover:bg-black hover:text-white dark:border-white/30 dark:bg-black dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black',
}

const classes = (variant: ButtonVariant, className = '') =>
  `group relative inline-flex h-9 items-center justify-center gap-2 overflow-hidden rounded-full border px-4 text-[13px] font-bold tracking-tight transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-white/70 dark:focus-visible:ring-offset-black [&_svg]:h-3.5 [&_svg]:w-3.5 ${variantClasses[variant]} ${className}`

export default function Button({ children, variant = 'primary', className = '', icon, href, target = '_blank', rel = 'noreferrer', type = 'button', disabled, ariaLabel, onClick }: ButtonProps) {
  const content = (
    <>
      <span className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition duration-500 group-hover:left-[130%] group-hover:opacity-100 dark:bg-white/20" />
      {icon ? <span className="relative z-10 inline-flex items-center">{icon}</span> : null}
      <span className="relative z-10 inline-flex items-center gap-1.5">{children}</span>
    </>
  )

  if (href) {
    return (
      <motion.a
        whileHover={{ scale: 1.018, y: -1 }}
        whileTap={{ scale: 0.985 }}
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onClick={onClick}
        className={classes(variant, className)}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.018, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.985 }}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className={classes(variant, className)}
    >
      {content}
    </motion.button>
  )
}
