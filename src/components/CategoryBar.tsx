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
    <div className="grid grid-cols-4 gap-x-3 gap-y-3 px-4 max-w-[720px] mx-auto mb-8 md:flex md:justify-center">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onCategoryChange(category)}
        className={clsx(
          'w-full h-8 rounded-full font-semibold text-sm shadow-md transition-transform duration-200 ease-in-out transform hover:-translate-y-0.5 text-ellipsis whitespace-nowrap overflow-hidden',
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