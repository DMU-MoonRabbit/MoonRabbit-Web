import React from 'react';
import { ConcernContent, ConcernAnswer, ConcernComment } from '../components/ConcernArticle';

const NightSkyDetailPage: React.FC = () => {
  
  return (
    <div className="flex flex-col items-center justify-center">
      <ConcernContent />
      <ConcernAnswer />
      <ConcernComment />
    </div>
  );
};

export default NightSkyDetailPage;