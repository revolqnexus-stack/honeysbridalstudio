import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { ReactNode, MouseEventHandler } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'ghost' | 'outline'
  children: ReactNode
  href?: string
  icon?: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function Button({ 
  variant = 'primary', 
  children, 
  className,
  href,
  icon,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2.5 px-8 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.1em] rounded-xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] whitespace-nowrap'
  
  const variants = {
    primary: 'bg-dark text-white border border-dark hover:bg-gold hover:border-gold hover:-translate-y-0.5 hover:shadow-gold',
    ghost: 'bg-white/15 text-white border border-white/40 backdrop-blur-[10px] hover:bg-white hover:text-dark hover:-translate-y-0.5',
    outline: 'bg-transparent text-dark border border-dark hover:bg-dark hover:text-white hover:-translate-y-0.5 hover:shadow-md',
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={cn(baseStyles, variants[variant], className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
        {icon && <span className="inline-flex">{icon}</span>}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {icon && <span className="inline-flex">{icon}</span>}
    </motion.button>
  )
}
