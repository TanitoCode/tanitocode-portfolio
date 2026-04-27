'use client'

import { useEffect, useRef, useState } from 'react'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3 | 4
  variant?: 'up' | 'fade'
  as?: keyof React.JSX.IntrinsicElements
}

export function FadeIn({
  children,
  className = '',
  delay = 0,
  variant = 'up',
  as: Tag = 'div',
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const revealClass = variant === 'up' ? 'reveal-up' : 'reveal-fade'
  const delayClass = delay > 0 ? ` reveal-delay-${delay}` : ''
  const visibleClass = visible ? ' is-visible' : ''

  const Component = Tag as React.ElementType

  return (
    <Component
      ref={ref}
      className={`${revealClass}${delayClass}${visibleClass}${className ? ` ${className}` : ''}`}
    >
      {children}
    </Component>
  )
}
