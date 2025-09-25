import React, { useState, useEffect } from 'react'
import { useResponsiveStore } from '../stores/useResponsiveStore'
import StarBackground from '../components/StarBackground'
import LogoImg from '../assets/images/MoonRabbitSleep2.png'
import Like from '../assets/images/Like.svg'
import Liked from '../assets/images/Liked.svg'
import axios from 'axios'
import { ENDPOINTS } from '../api/endpoints'
import { Question } from '../types/question'

const TodayQuestionPage: React.FC = () => {
  const { res } = useResponsiveStore()
  const isMobile = res === 'mo'
  
  const [todayQuestion, setTodayQuestion] = useState<Question | null>(null)
  const [loading, setLoading] = useState(true)
  const [likedCards, setLikedCards] = useState<Set<number>>(new Set())

  useEffect(() => {
    const fetchTodayQuestion = async () => {
      try {
        const response = await axios.get(ENDPOINTS.TODAY_QUESTION)
        setTodayQuestion(response.data)
      } catch (error) {
        console.error('오늘의 질문 조회 실패:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTodayQuestion()
  }, [])

  const handleLikeClick = (cardIndex: number) => {
    // 좋아요 토글
    if (likedCards.has(cardIndex)) {
      setLikedCards(prev => {
        const newSet = new Set([...prev])
        newSet.delete(cardIndex)
        return newSet
      })
    } else {
      setLikedCards(prev => new Set([...prev, cardIndex]))
    }
  }

  return (
    <div className="min-h-screen bg-lightBeige relative overflow-hidden">
      <StarBackground isMobile={isMobile} />

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
          
          {/* 오늘의 질문 */}
          <div className="text-darkWalnut text-lg lg:text-2xl xl:text-3xl font-normal font-mainFont max-w-4xl mx-auto leading-relaxed">
            {loading ? "질문을 불러오는 중..." : (todayQuestion?.content || "자신만의 스트레스 해소법은 뭔가요?")}
          </div>
        </div>

        {/* 질문답변 카드 섹션 */}
        <div className="mb-8 relative z-10">
          {isMobile ? (
            /* 모바일 레이아웃 */
            <div className="space-y-6">
              {[
                { type: 'text', content: '카페에서 노트북으로 넷플릭스 봐요 ☕️' },
                { type: 'challenge', content: '3일 동안 SNS 안 하기 📵' },
                { type: 'support', content: '나만 힘든 거 아니구나 싶어서 위로가 돼요 🌙' },
                { type: 'text', content: '런닝하고 샤워하면 고민이 다 날아가더라구요 🏃‍♂️' },
                { type: 'quote', content: '노래방에서 말달리자 3번 부르기' },
                { type: 'confession', content: '요즘 너무 외로워서 누군가랑 대화만 해도 좋을 것 같아요 🥲' }
              ].map((item, index) => {
                const isLiked = likedCards.has(index)
                return (
                  <div 
                    key={index}
                    className="relative overflow-hidden mx-auto flex flex-col bg-cover bg-center transition-transform duration-200 hover:translate-y-[-2px] max-w-full rounded-xl p-4"
                    style={{ 
                      backgroundImage: 'url("/images/ConcernBackground.png")',
                      boxShadow: 'rgb(71, 60, 44) 0px 0px 0px 2px inset'
                    }}
                  >
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <div className="text-center text-darkWalnut text-lg font-normal font-mainFont whitespace-pre-line">
                        {item.content}
                      </div>
                    </div>
                    
                    {/* 하트 좋아요 버튼 */}
                    <div className="absolute bottom-1 right-1 z-20">
                      <button
                        onClick={() => handleLikeClick(index)}
                        className="p-2 rounded-full transition-colors duration-200"
                      >
                        <img
                          src={isLiked ? Liked : Like}
                          alt="좋아요"
                          className="w-6 h-6 cursor-pointer"
                        />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            /* 데스크톱 레이아웃 */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
              {[
                { type: 'text', content: '카페에서 노트북으로 넷플릭스 봐요 ☕️' },
                { type: 'challenge', content: '3일 동안 SNS 안 하기 📵' },
                { type: 'support', content: '나만 힘든 거 아니구나 싶어서 위로가 돼요 🌙' },
                { type: 'text', content: '런닝하고 샤워하면 고민이 다 날아가더라구요 🏃‍♂️' },
                { type: 'quote', content: '노래방에서 말달리자 3번 부르기' },
                { type: 'confession', content: '요즘 너무 외로워서 누군가랑 대화만 해도 좋을 것 같아요 🥲' },
                { type: 'challenge', content: '낯선 사람에게 하루에 한 번 미소 짓기 😀' },
                { type: 'text', content: '음악 들으면서 그림 그리는 시간이 최고예요 🎨' },
                { type: 'support', content: '모든 게 완벽하지 않아도 괜찮다는 걸 배웠어요 💝' }
              ].map((item, index) => {
                const isLiked = likedCards.has(index)
                return (
                  <div 
                    key={index}
                    className="relative overflow-hidden flex flex-col bg-cover bg-center transition-transform duration-200 hover:translate-y-[-2px] rounded-xl p-4 min-h-[140px] w-full min-w-[400px] max-w-[400px]"
                    style={{ 
                      backgroundImage: 'url("/images/ConcernBackground.png")',
                      boxShadow: 'rgb(71, 60, 44) 0px 0px 0px 2px inset'
                    }}
                  >
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <div className="text-center text-darkWalnut text-xl lg:text-2xl font-normal font-mainFont whitespace-pre-line">
                        {item.content}
                      </div>
                    </div>
                    
                    {/* 하트 좋아요 버튼 */}
                    <div className="absolute bottom-1 right-1 z-20">
                      <button
                        onClick={() => handleLikeClick(index)}
                        className="p-3 rounded-full transition-colors duration-200"
                      >
                        <img
                          src={isLiked ? Liked : Like}
                          alt="좋아요"
                          className="w-8 h-8 cursor-pointer"
                        />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodayQuestionPage
