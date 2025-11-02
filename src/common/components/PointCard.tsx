import React from 'react'

interface PointCardProps {
  title: string
  imageUrl: string
  description: string
}

const PointCard: React.FC<PointCardProps> = ({
  title,
  imageUrl,
  description
}) => {
  return (
    <div className="flex flex-col items-start hover:scale-105 duration-300 flex-1">
      <div className="flex flex-col items-start">
        <h4 className="text-md font-mainFont text-white text-center mb-2 bg-mainColor rounded-full py-1.5 px-4 inline-block">
          {title}
        </h4>
      </div>
      <div 
        className="rounded-2xl w-full md:h-50 h-32 text-white shadow-md bg-cover bg-center bg-no-repeat md:min-h-[250px]"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <p className="text-sm text-mainGray font-gothicFont mt-2">{description}</p>
    </div>
  )
}

export default PointCard
