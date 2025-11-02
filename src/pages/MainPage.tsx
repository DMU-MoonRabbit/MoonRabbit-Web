import React from 'react'

import Logo from '@/common/components/Logo'
import ServiceExplainSection from '@/common/components/ServiceExplainSection'
import ServiceIntro from '@/common/components/ServiceIntro'
import TrustSection from '@/common/components/TrustSection'
import ConcernSection from '@/features/concern-board/components/ConcernSection'
import TalkSection from '@/features/daily-question/components/TalkSection'

const MainPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Logo />
      <TalkSection />
      <ConcernSection />
      <ServiceIntro />
      <ServiceExplainSection />
      <TrustSection />
    </div>
  )
}

export default MainPage
