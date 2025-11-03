import React from 'react'

interface PointUsingCardProps {
  title: string
  imageUrl: string
  description: string
}

const PointUsingCard: React.FC<PointUsingCardProps> = ({
  title,
  imageUrl,
  description,
}) => {
  
  return (
    <div className="flex flex-col items-start hover:scale-102 duration-300 flex-1 group rounded-3xl shadow-lg overflow-hidden bg-white">
      <div 
        className="w-full md:h-64 h-48 bg-cover bg-bottom bg-no-repeat relative"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      </div>
      <div className="w-full bg-white p-6 pt-8">
        <h4 className="text-2xl md:text-3xl font-mainFont text-mainColor mb-2">
          {title}
        </h4>
        <p className="text-base md:text-lg font-gothicFont text-lightWalnut leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

export default PointUsingCard
