import React from 'react';
import { PenBox } from 'lucide-react';

interface CreateConcernButtonProps {
  onClick?: () => void;
}

const CreateConcernButton: React.FC<CreateConcernButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-6 py-3 mr-7 bg-mainColor text-white rounded-lg shadow-md transition-transform duration-200 ease-in-out hover:scale-105"
    >
      <PenBox size={20} className="mr-2" /> 
      <span className="font-semibold text-base">밤하늘 그리기</span>
    </button>
  );
};

export default CreateConcernButton; 