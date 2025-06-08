import React from 'react'
import Logo from '../components/Logo'
import TalkSection from '../components/TalkSection'
import ConcernSection from '../components/ConcernSection'
import ServiceIntro from '../components/ServiceIntro'
import ServiceExplainSection from '../components/ServiceExplainSection'

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
