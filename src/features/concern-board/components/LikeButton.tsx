import React from 'react'
import Like from '@/assets/images/Like.svg'
import Liked from '@/assets/images/Liked.svg'

interface LikeButtonProps {
  isLiked: boolean
  onToggle: () => void
  size?: 'sm' | 'md' | 'lg'
}

export const LikeButton: React.FC<LikeButtonProps> = ({ 
  isLiked, 
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
        src={isLiked ? Liked : Like}
        alt="좋아요"
        className={`${sizeClasses[size]} cursor-pointer`}
      />
    </button>
  )
}
