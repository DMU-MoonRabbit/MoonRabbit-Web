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
                { type: 'text', content: '질문답변', placeholder: '답변을 입력해주세요...' },
                { type: 'challenge', content: '노래방가서 말달리자\n연속3번 부르기', placeholder: '도전 후기를 남겨주세요...' },
                { type: 'text', content: '질문답변', placeholder: '답변을 입력해주세요...' },
                { type: 'text', content: '질문답변', placeholder: '답변을 입력해주세요...' },
                { type: 'challenge', content: '노래방가서 말달리자\n연속3번 부르기', placeholder: '도전 후기를 남겨주세요...' },
                { type: 'text', content: '질문답변', placeholder: '답변을 입력해주세요...' }
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
                    <div className="absolute bottom-3 right-3 z-20">
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
                { type: 'text', content: '질문답변', placeholder: '답변을 입력해주세요...' },
                { type: 'challenge', content: '노래방가서 말달리자\n연속3번 부르기', placeholder: '도전 후기를 남겨주세요...' },
                { type: 'text', content: '질문답변', placeholder: '답변을 입력해주세요...' },
                { type: 'text', content: '질문답변', placeholder: '답변을 입력해주세요...' },
                { type: 'challenge', content: '노래방가서 말달리자\n연속3번 부르기', placeholder: '도전 후기를 남겨주세요...' },
                { type: 'text', content: '질문답변', placeholder: '답변을 입력해주세요...' },
                { type: 'text', content: '질문답변', placeholder: '답변을 입력해주세요...' },
                { type: 'challenge', content: '노래방가서 말달리자\n연속3번 부르기', placeholder: '도전 후기를 남겨주세요...' },
                { type: 'text', content: '질문답변', placeholder: '답변을 입력해주세요...' }
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
                    <div className="absolute bottom-4 right-4 z-20">
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
