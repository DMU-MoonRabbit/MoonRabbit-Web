import React, { useState } from 'react'
import LogoImg from '../assets/images/MoonRabbitSleep2.png'
import StarSvg from '../assets/images/starBackground.svg'
import { LikeButton } from '../components/LikeButton'
import { PlayButton } from '../components/PlayButton'

const ConstellationPage: React.FC = () => {
  const [playlistStates, setPlaylistStates] = useState<{[key: number]: {isPlaying: boolean, isLiked: boolean}}>({
    0: { isPlaying: false, isLiked: false },
    1: { isPlaying: false, isLiked: false },
    2: { isPlaying: false, isLiked: false }
  })

  const togglePlay = (index: number) => {
    setPlaylistStates(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        isPlaying: !prev[index].isPlaying
      }
    }))
  }

  const toggleLike = (index: number) => {
    setPlaylistStates(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        isLiked: !prev[index].isLiked
      }
    }))
  }

  return (
    <div className="min-h-screen bg-lightBeige relative overflow-hidden">
      {/* 배경 별들 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 데스크톱용 별들 */}
        <div className="hidden lg:block">
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
        
        {/* 모바일용 별들 */}
        <div className="block lg:hidden">
          <img src={StarSvg} alt="별" className="absolute top-16 right-4 w-6 h-6 opacity-80" />
          <img src={StarSvg} alt="별" className="absolute top-24 right-8 w-5 h-5 opacity-70 rotate-30" />
          <img src={StarSvg} alt="별" className="absolute top-32 left-4 w-4 h-4 opacity-60 rotate-60" />
          <img src={StarSvg} alt="별" className="absolute top-40 left-8 w-5 h-5 opacity-75 rotate-45" />
          <img src={StarSvg} alt="별" className="absolute bottom-40 right-4 w-4 h-4 opacity-65 rotate-15" />
          <img src={StarSvg} alt="별" className="absolute bottom-60 left-4 w-6 h-6 opacity-80 rotate-75" />
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* 헤더 섹션 */}
        <div className="text-center mb-8 lg:mb-16">
          {/* 메인 이미지 */}
          <div className="mb-6 lg:mb-8">
            <img 
              className="w-48 h-40 lg:w-72 lg:h-64 mx-auto object-contain" 
              src={LogoImg} 
              alt="달토끼 로고"
            />
          </div>
          
          {/* 메인 타이틀 */}
          <div className="mb-4 lg:mb-6">
            <span className="text-lightCaramel text-3xl lg:text-5xl font-normal font-mainFont">달</span>
            <span className="text-darkWalnut text-3xl lg:text-5xl font-normal font-mainFont">토끼</span>
          </div>
          
          {/* 서브 타이틀 */}
          <div className="text-darkWalnut text-lg lg:text-xl xl:text-2xl font-normal font-mainFont max-w-4xl mx-auto leading-relaxed">
            고민을 말하기도, 상담도 부담스럽다면 노래는 어때요?
          </div>
        </div>

        {/* 모바일: 번갈아가는 레이아웃, 데스크톱: 기존 그리드 레이아웃 */}
        <div className="mb-8 relative z-10">
          {/* 모바일 레이아웃 */}
          <div className="block lg:hidden space-y-6">
            {[
              { type: 'video', title: '유튜브 영상 1' },
              { type: 'card', title: '자존감 충전 필요할 때', index: 0 },
              { type: 'video', title: '유튜브 영상 2' },
              { type: 'card', title: '우울할 때', index: 1 },
              { type: 'video', title: '유튜브 영상 3' },
              { type: 'card', title: '스트레스 받을 때', index: 2 }
            ].map((item, idx) => (
              <div key={idx}>
                {item.type === 'video' ? (
                  <div className="bg-mainWhite rounded-lg border-3 border-mainColor aspect-video flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                    <span className="text-mainBlack text-lg font-normal font-mainFont">
                      {item.title}
                    </span>
                  </div>
                ) : (
                  <div className="bg-mainWhite rounded-lg shadow-md border-3 border-mainColor p-4 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center space-x-4">
                      <img 
                        className="w-16 h-16 rounded-md shadow-sm flex-shrink-0" 
                        src="https://placehold.co/120x120" 
                        alt={`${item.title} 이미지`}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-mainBlack text-lg font-normal font-mainFont mb-3">
                          {item.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <PlayButton
                            isPlaying={playlistStates[item.index].isPlaying}
                            onToggle={() => togglePlay(item.index)}
                            size="sm"
                          />
                          <LikeButton
                            isLiked={playlistStates[item.index].isLiked}
                            onToggle={() => toggleLike(item.index)}
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 데스크톱 레이아웃 */}
          <div className="hidden lg:block">
            {/* 유튜브 영상 섹션 */}
            <div className="mb-8">
              <h2 className="text-3xl font-mainFont text-darkWalnut text-center mb-8">
                추천 영상
              </h2>
              <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item}
                    className="bg-mainWhite rounded-lg border-3 border-mainColor aspect-video flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
                  >
                    <span className="text-mainBlack text-xl font-normal font-mainFont">
                      유튜브 영상 {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 카드 섹션 */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { title: "자존감 충전 필요할 때" },
                { title: "우울할 때" },
                { title: "스트레스 받을 때" }
              ].map((card, index) => (
                <div 
                  key={index}
                  className="bg-mainWhite rounded-lg shadow-md border-3 border-mainColor p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <img 
                      className="w-20 h-20 rounded-md shadow-sm flex-shrink-0" 
                      src="https://placehold.co/120x120" 
                      alt={`${card.title} 이미지`}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-mainBlack text-xl font-normal font-mainFont mb-3">
                        {card.title}
                      </h3>
                      <div className="flex items-center space-x-3">
                        <PlayButton
                          isPlaying={playlistStates[index].isPlaying}
                          onToggle={() => togglePlay(index)}
                          size="sm"
                        />
                        <LikeButton
                          isLiked={playlistStates[index].isLiked}
                          onToggle={() => toggleLike(index)}
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConstellationPage
