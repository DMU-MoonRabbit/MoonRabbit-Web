import React from 'react'
import Logo from '@/common/components/Logo'
import TalkSection from '@/features/daily-question/components/TalkSection'
import ConcernSection from '@/features/concern-board/components/ConcernSection'
import ServiceIntro from '@/common/components/ServiceIntro'
import ServiceExplainSection from '@/common/components/ServiceExplainSection'

const MainPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Logo />
      <TalkSection />
      <ConcernSection />
      <ServiceIntro />
      <ServiceExplainSection />
    </div>
  )
}

export default MainPage
