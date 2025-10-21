import React from 'react'

interface PageHeaderProps {
  showSubtitle?: boolean
  subtitleText?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({
  showSubtitle = true,
  subtitleText,
}) => {
  return (
    <div className="text-center mb-8 lg:mb-16">
      {/* 메인 이미지 */}
      <div className="mb-6 lg:mb-8">
        <img
          className="w-48 h-40 lg:w-72 lg:h-64 mx-auto object-contain"
          src="/images/MoonRabbitSleep2.png"
          alt="달토끼 로고"
          loading="eager"
        />
      </div>

      {/* 메인 타이틀 */}
      <div className="mb-4 lg:mb-6">
        <span className="text-lightCaramel text-3xl lg:text-5xl font-normal font-mainFont">
          달
        </span>
        <span className="text-darkWalnut text-3xl lg:text-5xl font-normal font-mainFont">
          토끼
        </span>
      </div>

      {/* 서브 타이틀 */}
      {showSubtitle && (
        <div className="text-darkWalnut text-lg lg:text-xl xl:text-2xl font-normal font-mainFont max-w-4xl mx-auto leading-relaxed">
          {subtitleText ??
            '고민을 말하기도, 상담도 부담스럽다면 노래는 어때요?'}
        </div>
      )}
    </div>
  )
}

export default PageHeader
