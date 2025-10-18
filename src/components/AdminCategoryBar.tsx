import React from 'react'
import { useAdminStore } from '../stores/useAdminStore'
import clsx from 'clsx'

const categories = [
  { id: 'members', label: '회원' },
  { id: 'posts', label: '게시글 및 댓글' },
  { id: 'dailyQuestion', label: '오늘의질문' },
]

export const AdminCategoryBar = () => {
  const { activeTab, setActiveTab } = useAdminStore()

  return (
    <div className="flex gap-2">
      {categories.map((category) => (
      <button
        key={category.id}
        onClick={() => setActiveTab(category.id as 'members' | 'posts' | 'dailyQuestion')}

        className={clsx(
          'min-w-fit h-8 rounded-full font-semibold text-xs sm:text-sm shadow-md transition-transform duration-200 ease-in-out transform hover:-translate-y-0.5 whitespace-nowrap px-3 sm:px-4',
          (activeTab === category.id)
            ? 'bg-[var(--color-mainColor)] text-[var(--color-white)]'
            : 'bg-[var(--color-white)] text-[var(--color-mainColor)]',
        )}
      >
        {category.label}
      </button>
      ))}
    </div>
  )
}
