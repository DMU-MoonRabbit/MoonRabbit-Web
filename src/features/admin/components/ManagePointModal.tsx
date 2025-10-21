import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ManagePointModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (changeValue: number) => void;
  title: string;
  initialValue: number;
  type: 'point' | 'trust';
}

export const ManagePointModal: React.FC<ManagePointModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  initialValue,
  type,
}) => {
  const [changeValue, setChangeValue] = useState(0);

  useEffect(() => {
    setChangeValue(0); // 모달이 열릴 때마다 0으로 초기화
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    if (changeValue === 0) {
      alert('변경할 값을 입력해주세요.');
      return;
    }
    onSave(Number(changeValue));
    onClose();
  };

  const getPreviewValue = () => {
    return initialValue + changeValue;
  };

  const getChangeType = () => {
    if (changeValue > 0) return '증가';
    if (changeValue < 0) return '감소';
    return '변경 없음';
  };

  const getChangeColor = () => {
    if (changeValue > 0) return 'text-green-600';
    if (changeValue < 0) return 'text-red-600';
    return 'text-gray-500';
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
        {/* 현재 값 표시 */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">현재 {type === 'point' ? '포인트' : '신뢰도'}</div>
          <div className="text-lg font-bold text-darkWalnut">{initialValue.toLocaleString()}</div>
        </div>
        
        {/* 변경 값 입력 필드 */}
        <div className="mb-4">
          <label className="block text-sm font-mainFont text-darkWalnut mb-2">
            {type === 'point' ? '포인트' : '신뢰도'} 변경량
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setChangeValue(changeValue - 1)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-lg font-bold"
            >
              -
            </button>
            <input
              type="number"
              value={changeValue}
              onChange={(e) => setChangeValue(Number(e.target.value))}
              className="flex-1 border-2 border-lightBeige rounded-lg px-4 py-3 focus:outline-none focus:border-mainColor transition-colors font-gothicFont text-darkWalnut text-center"
              placeholder="변경할 값"
              autoFocus
            />
            <button
              onClick={() => setChangeValue(changeValue + 1)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-lg font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* 미리보기 */}
        <div className="mb-6 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">변경 후 {type === 'point' ? '포인트' : '신뢰도'}</div>
          <div className="text-lg font-bold text-darkWalnut">
            {getPreviewValue().toLocaleString()}
            <span className={`ml-2 text-sm ${getChangeColor()}`}>
              ({changeValue > 0 ? '+' : ''}{changeValue} {getChangeType()})
            </span>
          </div>
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