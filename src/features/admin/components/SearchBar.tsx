import clsx from 'clsx'
import React from 'react'

import { useResponsiveStore } from '@/common/hooks/useResponsiveStore'

import { useAdminStore } from '../stores/useAdminStore'

export const SearchBar = () => {
  const { searchTerm, setSearchTerm, handleSearch, activeTab, clearSearch } =
    useAdminStore()
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  const placeholder =
    activeTab === 'members' ? '닉네임으로 검색' : '제목으로 검색'

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      handleSearch()
    } else {
      clearSearch()
    }
  }

  // 오늘의질문과 상점아이템 탭에서는 검색창 숨김
  if (activeTab === 'dailyQuestion' || activeTab === 'shopItems') {
    return null
  }

  return (
    <div
      className={clsx(
        `flex justify-between items-center bg-white pl-4 pr-1 py-1 rounded-full shadow-md`,
        isMobile ? 'w-full' : 'w-1/2',
      )}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        className="pr-4 rounded-lg focus:outline-none text-[16px] w-full"
      />
      <button
        onClick={handleSearchClick}
        className="bg-mainColor text-white min-w-fit h-8 rounded-full font-semibold text-xs sm:text-sm px-3 sm:px-4 cursor-pointer"
      >
        검색
      </button>
    </div>
  )
}
