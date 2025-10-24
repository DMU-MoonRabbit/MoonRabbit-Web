import React, { useState } from 'react'
import NightSkyDrawing from '@/assets/images/NightSkyDrawing.png'
import CommentWriting from '@/assets/images/CommentWriting.png'
import ClickLike from '@/assets/images/ClickingLike.png'

const ServiceExplainSection: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  return (
    <section className="relative w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 py-20 md:my-16">
      {/* 달토끼 메인기능 */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-4xl text-right text-mainColor font-mainFont leading-tight">
          달토끼와 같이 고민을 나눠요
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-lightWalnut font-mainFont mt-2 text-right">
          마음이 답답한데 어디에도 털어놓지 못하고 있다면, 달토끼에게 털어놓아보세요.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:mb-40 mb-20 items-start">
        {/* 밤하늘 */}
        <div 
          className={`w-full group relative bg-gradient-to-b from-white to-lightBeige rounded-3xl p-6 text-center overflow-hidden transition-all duration-500 shadow-lg flex-1 self-start cursor-pointer ${expandedCard === 'night-sky' ? 'pb-20 shadow-xl' : ''}`}
          style={{ boxShadow: '0 10px 25px rgba(226, 95, 71, 0.3)' }}
          onClick={() => setExpandedCard(expandedCard === 'night-sky' ? null : 'night-sky')}
        >
          <div className="text-4xl mb-4">🌙</div>
          <h3 className="text-lg sm:text-xl md:text-2xl text-mainColor font-mainFont mb-4">
            밤하늘
          </h3>
          <div className={`absolute bottom-0 left-0 right-0 bg-mainColor bg-opacity-90 text-white p-4 transition-transform duration-500 ${expandedCard === 'night-sky' ? 'translate-y-0' : 'translate-y-full'}`}>
            <p className="text-sm font-gothicFont leading-relaxed">
              자유롭게 고민을 나누는 곳이에요. 여러 고민들을 보고 얘기를 나눌 수 있어요.
            </p>
          </div>
        </div>

        {/* 별자리 */}
        <div 
          className={`w-full group relative bg-gradient-to-b from-white to-lightBeige rounded-3xl p-6 text-center overflow-hidden transition-all duration-500 shadow-lg flex-1 self-start cursor-pointer ${expandedCard === 'constellation' ? 'pb-20 shadow-xl' : ''}`}
          style={{ boxShadow: '0 10px 25px rgba(226, 95, 71, 0.3)' }}
          onClick={() => setExpandedCard(expandedCard === 'constellation' ? null : 'constellation')}
        >
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-lg sm:text-xl md:text-2xl text-mainColor font-mainFont mb-4">
            별자리
          </h3>
          <div className={`absolute bottom-0 left-0 right-0 bg-mainColor bg-opacity-90 text-white p-4 transition-transform duration-500 ${expandedCard === 'constellation' ? 'translate-y-0' : 'translate-y-full'}`}>
            <p className="text-sm font-gothicFont leading-relaxed">
              마음에 닿는 플리를 추천해주는 공간이에요. 지금 당신에게 어울리는 작은 위로를 찾아보세요.
            </p>
          </div>
        </div>

        {/* 오늘의 질문 */}
        <div 
          className={`w-full group relative bg-gradient-to-b from-white to-lightBeige rounded-3xl p-6 text-center overflow-hidden transition-all duration-500 shadow-lg flex-1 self-start cursor-pointer ${expandedCard === 'daily-question' ? 'pb-20 shadow-xl' : ''}`}
          style={{ boxShadow: '0 10px 25px rgba(226, 95, 71, 0.3)' }}
          onClick={() => setExpandedCard(expandedCard === 'daily-question' ? null : 'daily-question')}
        >
          <div className="text-4xl mb-4">💭</div>
          <h3 className="text-lg sm:text-xl md:text-2xl text-mainColor font-mainFont mb-4">
            오늘의 질문
          </h3>
          <div className={`absolute bottom-0 left-0 right-0 bg-mainColor bg-opacity-90 text-white p-4 transition-transform duration-500 ${expandedCard === 'daily-question' ? 'translate-y-0' : 'translate-y-full'}`}>
            <p className="text-sm font-gothicFont leading-relaxed">
              매일매일 바뀌는 질문에 답을 하며 스스로에게 말을 걸어보는 시간이에요.
            </p>
          </div>
        </div>
      </div>

      {/* 신뢰도 */}
      <div className="w-full">
        <div>
          <div className="text-left mb-8">
            <h3 className="text-2xl md:text-4xl text-mainColor font-mainFont mb-2">
              신뢰도를 쌓아 포인트를 얻어요
            </h3>
            <p className="text-base sm:text-lg text-lightWalnut font-mainFont">
              여러 활동을 통해 포인트를 얻고 내 프로필을 꾸며보세요!
            </p>
          </div>

           <div className="flex flex-col md:flex-row gap-8 w-full">
             {/* 포인트 획득 방법 */}
             <div className="flex flex-col items-start hover:scale-105 duration-300 flex-1">
               <div className="flex flex-col items-start">
                 <h4 className="text-md font-mainFont text-white text-center mb-2 bg-mainColor rounded-full py-1.5 px-4 inline-block">밤하늘 그리기</h4>
               </div>
               <div 
                 className="rounded-2xl w-full md:h-50 h-32 text-white shadow-md bg-cover bg-center bg-no-repeat"
                 style={{ backgroundImage: `url(${NightSkyDrawing})` }}
               />
               <p className="text-sm text-mainGray font-gothicFont mt-2">모두와 고민을 공유하기만 해도 포인트를 얻을 수 있어요</p>
             </div>
             <div className="flex flex-col items-start hover:scale-105 duration-300 flex-1">
               <div className="flex flex-col items-start">
                 <h4 className="text-md font-mainFont text-white text-center mb-2 bg-mainColor rounded-full py-1.5 px-4 inline-block">댓글 달기</h4>
               </div>
               <div 
                 className="rounded-2xl w-full md:h-50 h-32 text-white shadow-md bg-cover bg-center bg-no-repeat"
                 style={{ backgroundImage: `url(${CommentWriting})` }}
               />
               <p className="text-sm text-mainGray font-gothicFont mt-2">다른 사람의 고민에 공감과 위로의 답변을 달아요</p>
             </div>
             <div className="flex flex-col items-start hover:scale-105 duration-300 flex-1">
               <div className="flex flex-col items-start">
                 <h4 className="text-md font-mainFont text-white text-center mb-2 bg-mainColor rounded-full py-1.5 px-4 inline-block">좋아요 받기</h4>
               </div>
               <div 
                 className="rounded-2xl w-full md:h-50 h-32 text-white shadow-md bg-cover bg-center bg-no-repeat"
                 style={{ backgroundImage: `url(${ClickLike})` }}
               />
               <p className="text-sm text-mainGray font-gothicFont mt-2">내 댓글에 좋아요가 달리면 포인트가 올라요</p>
             </div>
           </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceExplainSection
