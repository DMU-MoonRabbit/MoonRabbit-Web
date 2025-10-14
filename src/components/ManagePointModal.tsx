import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface ManagePointModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newValue: number) => void;
  title: string;
  initialValue: number;
}

export const ManagePointModal: React.FC<ManagePointModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  initialValue,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave(Number(value));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div 
        className="relative z-10 bg-neutral-50 rounded-[20px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.16)] p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center">
            <img
              src="/images/MoonRabbitSleep2.png"
              alt="logo"
              className="w-16 h-16 mr-3"
            />
            <div className="flex flex-col font-mainFont text-darkWalnut">
              <div className="flex items-baseline">
                <span className="text-lightCaramel text-xl">달</span>
                <span className="text-darkWalnut text-xl">토끼</span>
              </div>
              <div className="flex items-baseline text-xs">
                <span className="text-lightCaramel">Moon</span>
                <span className="text-darkWalnut">Rabbit</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-darkWalnut hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* 타이틀 */}
        <h3 className="text-xl font-mainFont text-darkWalnut mb-6">{title}</h3>
        
        {/* 숫자 입력 필드 */}
        <div className="mb-6">
          <label className="block text-sm font-mainFont text-darkWalnut mb-2">
            새로운 값
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full border-2 border-lightBeige rounded-lg px-4 py-3 focus:outline-none focus:border-mainColor transition-colors font-gothicFont text-darkWalnut"
            autoFocus
          />
        </div>
        
        {/* 버튼 */}
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full font-mainFont text-darkWalnut bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-full font-mainFont text-white bg-mainColor hover:bg-opacity-80 transition-colors"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};