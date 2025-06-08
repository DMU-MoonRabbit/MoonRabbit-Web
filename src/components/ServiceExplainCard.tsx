import React from 'react'

interface ServiceExplainCardProps {
  title: string
  subtitle: string
  backgroundImage: string
}

const ServiceExplainCard: React.FC<ServiceExplainCardProps> = ({
  title,
  subtitle,
  backgroundImage,
}) => {
  return (
    <div className="relative w-full max-w-[1600px] mx-auto min-h-[400px] sm:min-h-[500px] md:min-h-[600px] xl:min-h-[620px]">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      {/* 배경 색 */}
      <div className="absolute inset-0 bg-mainBlack bg-opacity-50 rounded-[20px]" />

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col justify-between h-full px-4 sm:px-8 md:px-12 py-10 sm:py-14 md:py-16">
        <h2 className="font-mainFont text-mainWhite text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-center sm:text-left">
          {title}
        </h2>

        <p className="text-mainWhite whitespace-pre-line text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-gothicFont leading-relaxed text-center sm:text-left mt-4">
          {subtitle}
        </p>
      </div>
    </div>
  )
}

export default ServiceExplainCard
