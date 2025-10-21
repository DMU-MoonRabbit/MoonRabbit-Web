import React from 'react'

import ServiceExplainCard from './ServiceExplainCard'

const ServiceExplainSection: React.FC = () => {
  return (
    <section className="relative w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
      {/* 제목 */}
      <h2 className="text-xl sm:text-2xl md:text-3xl text-center text-mainColor font-mainFont mt-20 mb-20 relative z-10">
        달토끼엔 이런 기능들이 있어요
      </h2>

      {/* 별 배경 이미지 */}
      <div className="absolute inset-0 w-full h-80% mt-40 z-index-0">
        <img
          src="/images/MoonRabbitStars.png"
          alt="달토끼 별 배경"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* 카드 */}
      <div className="relative">
        <ServiceExplainCard
          title="밤하늘"
          subtitle={`밤하늘은 자유롭게 고민을 나누는 곳이에요.\n여러 고민들을 보고 얘기를 나눌 수 있어요.`}
          backgroundImage="/shooting-star-2024127-1920-1.png"
        />
      </div>

      <div className="relative mt-20">
        <ServiceExplainCard
          title="별자리"
          subtitle={`별자리는 마음에 닿는 플리를 추천해주는 공간이에요.\n지금 당신에게 어울리는 작은 위로를 찾아보세요.`}
          backgroundImage="/shooting-star-2024127-1920-1.png"
        />
      </div>

      <div className="relative mt-20 mb-20">
        <ServiceExplainCard
          title="오늘의 질문"
          subtitle={`오늘의 질문은 매일매일 바뀌는 질문에 답을 하며 스스로에게 말을 걸어보는 시간이에요.\n내 마음을 천천히 들여다보는 작은 계기를 놓치지 마세요.`}
          backgroundImage="/shooting-star-2024127-1920-1.png"
        />
      </div>
    </section>
  )
}

export default ServiceExplainSection
