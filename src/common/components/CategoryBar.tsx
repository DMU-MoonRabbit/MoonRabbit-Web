import clsx from 'clsx'
import React from 'react'

interface CategoryBarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  disableCentering?: boolean
}

const categories = [
  '전체',
  '가족',
  '연애',
  '진로',
  '정신건강',
  '사회생활',
  '대인관계',
]

const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onCategoryChange,
  disableCentering,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-row flex-wrap gap-3 px-4 max-w-[720px] items-center',
        !disableCentering && 'mx-auto md:justify-center items-center',
      )}
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={clsx(
            'min-w-fit h-8 rounded-full font-semibold text-xs sm:text-sm shadow-md transition-transform duration-200 ease-in-out transform hover:-translate-y-0.5 whitespace-nowrap px-3 sm:px-4',
            selectedCategory === category
              ? 'bg-[var(--color-mainColor)] text-[var(--color-white)]'
              : 'bg-[var(--color-white)] text-[var(--color-mainColor)]',
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryBar
