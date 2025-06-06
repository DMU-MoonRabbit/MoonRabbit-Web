import React from 'react';
import CategoryBar from './CategoryBar';
import { useResponsiveStore } from '../stores/useResponsiveStore';
import { useAnonymousStore } from '../stores/useAnonymousStore';

const MODAL_STYLES = {
  width: 'w-[1200px]',
  height: 'h-[600px]',
  sectionSpacing: 'mb-6',
  logoSpacing: 'mb-10',
} as const;

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
  const { res } = useResponsiveStore();
  const { anonymous, toggleAnonymous, setAnonymous } = useAnonymousStore();

  if (!isOpen) return null;

  const handleClose = () => {
    setAnonymous(false); // 모달 닫을 때 상태 초기화
    onClose();
  };

  const handleSubmit = () => {
    // 필요 시 이곳에서 anonymous 상태도 활용 가능
    console.log('익명 여부:', anonymous);
    onCreateConcern(); // 서버 요청 함수에 anonymous 상태 전달해도 됨
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className={`bg-white rounded-xl shadow-lg p-8 ${
        res === 'pc' 
          ? `${MODAL_STYLES.width} ${MODAL_STYLES.height}` 
          : 'w-[90%] h-[80vh]'
      } relative flex flex-col`}>

        <button onClick={handleClose} className="absolute top-3 right-6 text-4xl z-10">
          &times;
        </button>

        <div className="flex-grow overflow-y-auto p-4 hide-scrollbar">
          {/* 로고 */}
          <div className={`flex items-center justify-center ${MODAL_STYLES.logoSpacing}`}>
            <img src="/images/MoonRabbitSleep.png" alt="Moon Rabbit Logo" className="h-24 w-auto mr-4" />
            <div className="font-mainFont">
              <p className="text-xl text-gray-800"><span style={{ color: 'var(--color-lightCaramel)' }}>달</span>토끼</p>
              <p className="text-sm text-gray-600"><span style={{ color: 'var(--color-lightCaramel)' }}>Moon</span>Rabbit</p>
            </div>
          </div>

          {/* 익명 버튼 */}
          <div className="flex justify-start mb-4">
            <button
              onClick={toggleAnonymous}
              className={`px-4 py-2 rounded-lg text-sm font-mainFont transition-colors duration-200 shadow-sm bg-gray-200 ${
                anonymous
                  ? 'bg-mainColor text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {anonymous ? '익명 작성 중' : '익명으로 작성하기'}
            </button>
          </div>


          {/* 고민제목 */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-[20px] font-mainFont mb-2 text-mainBlack">
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="고민의 제목을 입력해주세요"
              className="w-full px-4 py-3 text-[16px] border-2 border-lightBeige rounded-lg focus:outline-none focus:border-mainColor transition-colors duration-200 placeholder:text-mainGray"
            />
          </div>

          {/* 태그 + 카테고리 */}
          <div className={MODAL_STYLES.sectionSpacing}>
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
          <div className="mb-6">
            <label htmlFor="content" className="block text-[20px] mb-2 font-mainFont">
              내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              placeholder="고민을 자유롭게 작성해주세요"
              className="w-full px-4 py-3 text-[16px] border-2 border-lightBeige rounded-lg focus:outline-none focus:border-mainColor transition-colors duration-200 placeholder:text-mainGray min-h-[200px] resize-none"
            />
          </div>
        </div>

        {/* 등록 버튼 */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSubmit}
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