import React from 'react'
import { useAdminStore } from '../../stores/useAdminStore'
import clsx from 'clsx'
import { useResponsiveStore } from '../../stores/useResponsiveStore'

export const SearchBar = () => {
  const { searchTerm, setSearchTerm, handleSearch, activeTab, clearSearch } = useAdminStore()

  const placeholder = activeTab === 'members' ? '닉네임으로 검색' : '제목으로 검색'

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

  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  return (
    <div className={clsx(`flex justify-between items-center bg-white pl-4 pr-1 py-1 rounded-full shadow-md`, isMobile ? 'w-full' : 'w-1/2')}>
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

