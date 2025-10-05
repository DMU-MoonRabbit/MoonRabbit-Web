import React from 'react'
import { useAdminStore } from '../stores/useAdminStore'

export const SearchBar = () => {
  const { searchTerm, setSearchTerm, handleSearch } = useAdminStore()

  return (
    <div className="flex justify-between items-center bg-white pl-4 pr-1 py-1 rounded-full shadow-md w-1/2">
      <input
        type="text"
        placeholder="닉네임으로 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
        className="pr-4 rounded-lg focus:outline-none text-[16px] w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-mainColor text-white min-w-fit h-8 rounded-full font-semibold text-xs sm:text-sm px-3 sm:px-4 cursor-pointer"
      >
        검색
      </button>
    </div>
  )
}
