import React from 'react';
import Logo from '../components/Logo';
import TalkSection from '../components/TalkSection';
import ConcernSection from '../components/ConcernSection';
import { useResponsiveStore } from '../stores/useResponsiveStore';

const MainPage: React.FC = () => {
  const res = useResponsiveStore((state) => state.res);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lightBeige">
      <Logo />
      <TalkSection />
      <ConcernSection />
    </div>
  );
};

export default MainPage;