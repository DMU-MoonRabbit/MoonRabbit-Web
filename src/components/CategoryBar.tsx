import React from 'react';
import clsx from 'clsx';

interface CategoryBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  '전체',
  '가족',
  '연인',
  '진로',
  '정신건강',
  '사회생활',
  '대인관계'
];

const CategoryBar: React.FC<CategoryBarProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex gap-x-4 gap-y-3 md:gap-x-4 md:gap-y-3 justify-center px-5 md:px-5 max-w-[680px] mx-auto mb-8 sm:flex-wrap sm:gap-2 sm:px-1">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={clsx(
            'w-20 h-7 rounded-full font-semibold text-sm shadow-md transition-transform duration-200 ease-in-out transform hover:-translate-y-0.5',
            selectedCategory === category
              ? 'bg-[var(--color-mainColor)] text-[var(--color-white)]'
              : 'bg-[var(--color-white)] text-[var(--color-mainColor)]'
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;