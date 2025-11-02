import React from 'react'

import Logo from '@/common/components/Logo'
import ScrollReveal from '@/common/components/ScrollReveal'
import ServiceExplainSection from '@/common/components/ServiceExplainSection'
import ServiceIntro from '@/common/components/ServiceIntro'
import TrustSection from '@/common/components/TrustSection'
import ConcernSection from '@/features/concern-board/components/ConcernSection'
import TalkSection from '@/features/daily-question/components/TalkSection'

const MainPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Logo />
      <ScrollReveal direction="fade" delay={0}>
        <TalkSection />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={100}>
        <ConcernSection />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={200}>
        <ServiceIntro />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={300}>
        <ServiceExplainSection />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={400}>
        <TrustSection />
      </ScrollReveal>
    </div>
  )
}

export default MainPage
