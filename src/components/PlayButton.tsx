import React from 'react'
import PlaySvg from '../assets/images/play.svg'
import StopSvg from '../assets/images/stop.svg'

interface PlayButtonProps {
  isPlaying: boolean
  onToggle: () => void
  size?: 'sm' | 'md' | 'lg'
}

export const PlayButton: React.FC<PlayButtonProps> = ({ 
  isPlaying, 
  onToggle, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14'
  }

  return (
    <button
      onClick={onToggle}
      className={`${sizeClasses[size]} hover:scale-105 transition-transform duration-200`}
    >
      <img
        src={isPlaying ? StopSvg : PlaySvg}
        alt={isPlaying ? '정지' : '재생'}
        className={`${sizeClasses[size]} cursor-pointer`}
      />
    </button>
  )
}
