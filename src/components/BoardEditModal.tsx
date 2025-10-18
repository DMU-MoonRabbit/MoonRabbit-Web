import React, { useState, useEffect } from 'react';
import { AdminModal } from './AdminModal';

interface BoardEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; content: string; category: string; anonymous: boolean }) => void;
  initialData?: {
    title: string;
    content: string;
    category: string;
    anonymous: boolean;
  };
  boardId: number;
}

const CATEGORIES = [
  '전체',
  '진로',
  '연애',
  '가족',
  '친구',
  '학업',
  '건강',
  '일상',
  '기타'
];

export const BoardEditModal: React.FC<BoardEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  boardId,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [category, setCategory] = useState(initialData?.category || '전체');
  const [anonymous, setAnonymous] = useState(initialData?.anonymous || false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setCategory(initialData.category);
      setAnonymous(initialData.anonymous);
    }
  }, [initialData]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    onSave({
      title: title.trim(),
      content: content.trim(),
      category,
      anonymous,
    });
  };

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={`게시글 수정 (ID: ${boardId})`}
    >
      {/* 제목 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-mainFont text-darkWalnut mb-2">
            제목 *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-2 border-lightBeige rounded-lg px-4 py-3 focus:outline-none focus:border-mainColor transition-colors font-gothicFont text-darkWalnut"
            placeholder="제목을 입력하세요"
            maxLength={100}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {title.length}/100
          </div>
        </div>

        {/* 내용 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-mainFont text-darkWalnut mb-2">
            내용 *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border-2 border-lightBeige rounded-lg px-4 py-3 focus:outline-none focus:border-mainColor transition-colors font-gothicFont text-darkWalnut resize-none"
            placeholder="내용을 입력하세요"
            rows={6}
            maxLength={1000}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {content.length}/1000
          </div>
        </div>

        {/* 카테고리 선택 */}
        <div className="mb-6">
          <label className="block text-sm font-mainFont text-darkWalnut mb-2">
            카테고리
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border-2 border-lightBeige rounded-lg px-4 py-3 focus:outline-none focus:border-mainColor transition-colors font-gothicFont text-darkWalnut"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* 익명 여부 */}
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="w-4 h-4 text-mainColor bg-gray-100 border-gray-300 rounded focus:ring-mainColor focus:ring-2"
            />
            <span className="ml-2 text-sm font-mainFont text-darkWalnut">
              익명으로 게시
            </span>
          </label>
        </div>

      {/* 버튼 영역 */}
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
    </AdminModal>
  );
};
