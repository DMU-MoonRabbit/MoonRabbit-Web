import React from 'react'

interface FeatureCardProps {
  emoji: string
  title: string
  description: string
  isExpanded: boolean
  onClick: () => void
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  emoji,
  title,
  description,
  isExpanded,
  onClick,
}) => {
  return (
    <div
      className={`w-full group relative bg-gradient-to-b from-white to-lightBeige rounded-3xl p-6 text-center overflow-hidden transition-all duration-500 shadow-lg flex-1 self-start cursor-pointer ${isExpanded ? 'pb-20 shadow-xl' : ''}`}
      style={{ boxShadow: '0 10px 25px rgba(226, 95, 71, 0.3)' }}
      onClick={onClick}
    >
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-lg sm:text-xl md:text-2xl text-mainColor font-mainFont mb-4">
        {title}
      </h3>
      <div
        className={`absolute bottom-0 left-0 right-0 bg-mainColor bg-opacity-90 text-white p-4 transition-transform duration-500 ${isExpanded ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <p className="text-sm font-gothicFont leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export default FeatureCard
