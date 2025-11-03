import React, { useState } from 'react'

import FeatureCard from './FeatureCard'

const ServiceExplainSection: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  return (
    <section className="relative w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 my-20">
      {/* 달토끼 게시판 역할 */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-4xl text-center text-mainColor font-mainFont leading-tight">
          달토끼와 같이 고민을 나눠요
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-lightWalnut font-mainFont mt-2 text-center">
          마음이 답답한데 어디에도 털어놓지 못하고 있다면, 달토끼에게 털어놓아보세요.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <FeatureCard
          emoji="🌙"
          title="밤하늘"
          description="자유롭게 고민을 나누는 곳이에요. 여러 고민들을 보고 얘기를 나눌 수 있어요."
          isExpanded={expandedCard === 'night-sky'}
          onClick={() =>
            setExpandedCard(expandedCard === 'night-sky' ? null : 'night-sky')
          }
        />
        <FeatureCard
          emoji="⭐"
          title="별자리"
          description="마음에 닿는 플리를 추천해주는 공간이에요. 지금 당신에게 어울리는 작은 위로를 찾아보세요."
          isExpanded={expandedCard === 'constellation'}
          onClick={() =>
            setExpandedCard(
              expandedCard === 'constellation' ? null : 'constellation',
            )
          }
        />
        <FeatureCard
          emoji="💭"
          title="오늘의 질문"
          description="매일매일 바뀌는 질문에 답을 하며 스스로에게 말을 걸어보는 시간이에요."
          isExpanded={expandedCard === 'daily-question'}
          onClick={() =>
            setExpandedCard(
              expandedCard === 'daily-question' ? null : 'daily-question',
            )
          }
        />
      </div>
    </section>
  )
}

export default ServiceExplainSection
