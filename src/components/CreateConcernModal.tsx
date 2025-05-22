import React, { useState } from 'react';
import CategoryBar from './CategoryBar';

interface CreateConcernModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onCreateConcern: () => void;
  title: string;
  content: string;
}

const CreateConcernModal: React.FC<CreateConcernModalProps> = ({
  isOpen,
  onClose,
  onCategoryChange,
  selectedCategory,
  onTitleChange,
  onContentChange,
  onCreateConcern,
  title,
  content,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-[1200px] h-[600px] relative flex flex-col">
        
        <button onClick={onClose} className="absolute top-3 right-6 text-4xl z-10">
          &times;
        </button>

        <div className="flex-grow overflow-y-auto p-4 hide-scrollbar">
          {/* 로고  */}
          <div className="mb-6 flex items-center justify-center mb-10">
             <img src="/images/MoonRabbitSleep.png" alt="Moon Rabbit Logo" className="h-24 w-auto mr-4" />
             <div className="font-mainFont">
                <p className="text-xl text-gray-800"><span style={{ color: 'var(--color-lightCaramel)' }}>달</span>토끼</p>
                <p className="text-sm text-gray-600"><span style={{ color: 'var(--color-lightCaramel)' }}>Moon</span>Rabbit</p>
             </div>
          </div>

          {/* 고민제목 */}
          <div className="mb-6 block items-center gap-4">
            <label htmlFor="concernTitle" className="block text-lg font-mainFont">제목</label>
            <input
              type="text"
              id="concernTitle"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full rounded-md border-mainColor shadow-sm focus:border-mainColor sm:text-sm"
              placeholder="제목을 입력하세요."
            />
          </div>

          {/* 태그 + 카테고리바 */}
          <div className="mb-6">
            <label className="flex text-lg font-mainFont">태그</label>
            <div className="mt-2 justify-end">
              <CategoryBar
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
                disableCentering={true}
              />
            </div>
          </div>

          {/* 고민내용 */}
          <div className="mb-6 flex-grow">
             <label htmlFor="concernContent" className="block text-lg font-mainFont">내용</label>
             <textarea
               id="concernContent"
               value={content}
               onChange={(e) => onContentChange(e.target.value)}
               rows={8}
               className="mt-1 block w-full rounded-md border-mainColor shadow-sm focus:border-mainColor sm:text-sm"
               placeholder="당신의 고민을 자유롭게 작성해주세요."
             ></textarea>
          </div>

        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={onCreateConcern}
            className="bg-[var(--color-mainColor)] text-[var(--color-white)] px-3 py-1 rounded-lg text-lg font-mainFont shadow-md hover:bg-red-600 transition-colors"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateConcernModal; 