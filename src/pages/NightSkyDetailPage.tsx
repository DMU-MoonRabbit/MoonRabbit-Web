import React from 'react';
import { ConcernContent, ConcernAnswer } from '../components/ConcernPost';
import { ConcernComment } from '../components/ConcernComment';

const NightSkyDetailPage: React.FC = () => {
  
  return (
    <div className="flex flex-col items-center justify-center">
      <ConcernContent />
      <ConcernAnswer />
      <ConcernComment />
    </div>
  )
}

export default NightSkyDetailPage