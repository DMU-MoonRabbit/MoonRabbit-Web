import React from 'react'
import StarSvg from '../assets/images/starBackground.svg'

interface StarBackgroundProps {
  isMobile: boolean
}

const StarBackground: React.FC<StarBackgroundProps> = ({ isMobile }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* 데스크톱용 별들 */}
      {!isMobile && (
        <div>
          <img src={StarSvg} alt="별" className="absolute top-20 right-32 w-8 h-8 opacity-80" />
          <img src={StarSvg} alt="별" className="absolute top-32 right-24 w-6 h-6 opacity-70 rotate-12" />
          <img src={StarSvg} alt="별" className="absolute top-40 right-40 w-5 h-5 opacity-60 rotate-45" />
          <img src={StarSvg} alt="별" className="absolute top-60 left-20 w-10 h-10 opacity-75 rotate-30" />
          <img src={StarSvg} alt="별" className="absolute top-80 left-32 w-7 h-7 opacity-65 rotate-60" />
          <img src={StarSvg} alt="별" className="absolute top-96 right-16 w-9 h-9 opacity-80 rotate-15" />
          <img src={StarSvg} alt="별" className="absolute bottom-40 left-16 w-8 h-8 opacity-70 rotate-45" />
          <img src={StarSvg} alt="별" className="absolute bottom-60 right-20 w-6 h-6 opacity-60 rotate-75" />
          <img src={StarSvg} alt="별" className="absolute bottom-80 left-40 w-12 h-12 opacity-85 rotate-25" />
        </div>
      )}
      
      {/* 모바일용 별들 */}
      {isMobile && (
        <div>
          <img src={StarSvg} alt="별" className="absolute top-16 right-4 w-6 h-6 opacity-80" />
          <img src={StarSvg} alt="별" className="absolute top-24 right-8 w-5 h-5 opacity-70 rotate-30" />
          <img src={StarSvg} alt="별" className="absolute top-32 left-4 w-4 h-4 opacity-60 rotate-60" />
          <img src={StarSvg} alt="별" className="absolute top-40 left-8 w-5 h-5 opacity-75 rotate-45" />
          <img src={StarSvg} alt="별" className="absolute bottom-40 right-4 w-4 h-4 opacity-65 rotate-15" />
          <img src={StarSvg} alt="별" className="absolute bottom-60 left-4 w-6 h-6 opacity-80 rotate-75" />
        </div>
      )}
    </div>
  )
}

export default StarBackground
