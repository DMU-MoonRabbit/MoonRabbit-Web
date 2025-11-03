import React from 'react'

import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true,
  })

  const getTransformClass = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return 'translate-y-8 opacity-0'
        case 'down':
          return '-translate-y-8 opacity-0'
        case 'left':
          return 'translate-x-8 opacity-0'
        case 'right':
          return '-translate-x-8 opacity-0'
        case 'fade':
          return 'opacity-0'
        default:
          return 'translate-y-8 opacity-0'
      }
    }
    return 'translate-y-0 translate-x-0 opacity-100'
  }

  return (
    <div
      ref={elementRef}
      className={`w-full transition-all duration-700 ease-out ${getTransformClass()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
