import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useResponsiveStore } from '../stores/useResponsiveStore'
import clsx from 'clsx'

interface NicknameColorModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ColorItem {
  id: number
  name: string
  color: string
  gradientClass: string
  price: number
}

const NicknameColorModal: React.FC<NicknameColorModalProps> = ({ isOpen, onClose }) => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'
  const [currentPage, setCurrentPage] = useState(0)

  const colorItems: ColorItem[] = [
    { id: 1, name: '마젠타', color: 'text-pink-600', gradientClass: 'bg-pink-600', price: 200 },
    { id: 2, name: '시안', color: 'text-sky-300', gradientClass: 'bg-sky-300', price: 200 },
    { id: 3, name: '스페이스 실버', color: 'text-neutral-300', gradientClass: 'bg-gradient-to-b from-neutral-300 to-black', price: 1500 },
    { id: 4, name: '파스텔 피치', color: 'text-red-300', gradientClass: 'bg-gradient-to-b from-red-300 via-red-200 to-yellow-200', price: 2000 },
  ]

  const itemsPerPage = isMobile ? 2 : 4
  const totalPages = Math.ceil(colorItems.length / itemsPerPage)

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  const displayedItems = colorItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div
        className={clsx(
          'relative z-10 bg-neutral-50 rounded-[20px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.16)] p-6',
          isMobile ? 'w-[90vw] max-w-[400px]' : 'w-[1200px] h-[600px]'
        )}
      >
        {/* 헤더 */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center">
            <img
              src="/images/MoonRabbitSleep2.png"
              alt="logo"
              className={clsx(isMobile ? 'w-16 h-16' : 'w-24 h-24', 'mr-4')}
            />
            <div className="flex flex-col font-mainFont text-darkWalnut">
              <div className="flex items-baseline">
                <span className="text-lightCaramel text-2xl lg:text-3xl">달</span>
                <span className="text-darkWalnut text-2xl lg:text-3xl">토끼</span>
              </div>
              <div className="flex items-baseline text-xs">
                <span className="text-lightCaramel">Moon</span>
                <span className="text-darkWalnut">Rabbit</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-darkWalnut">
            <X size={24} />
          </button>
        </div>

        {/* 타이틀 */}
        <h2 className={clsx('font-mainFont text-darkWalnut mb-8', isMobile ? 'text-xl' : 'text-2xl')}>
          닉네임 색상
        </h2>

        {/* 색상 아이템 그리드 */}
        <div
          className={clsx(
            'grid gap-6 mb-8',
            isMobile ? 'grid-cols-2' : 'grid-cols-4'
          )}
        >
          {displayedItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              {/* 색상 카드 */}
              <div className={clsx(
                'rounded-[10px] border-[3px] border-mainColor p-4 mb-4 flex flex-col items-center',
                isMobile ? 'w-full' : 'w-52 h-56'
              )}>
                {/* 원형 색상 프리뷰 */}
                <div className={clsx('rounded-full mb-3', item.gradientClass, isMobile ? 'w-24 h-24' : 'w-40 h-40 aspect-square')} />
                
                {/* 색상 이름 */}
                <span className={clsx('font-mainFont text-xl lg:text-2xl mb-2', item.color)}>
                  {item.name}
                </span>
              </div>
              
              {/* 가격 */}
              <div className="flex items-center">
                <img src="/images/MoonRabbitSleep2.png" alt="달토끼" className="w-12 h-12 mr-2" />
                <span className="text-darkWalnut text-lg lg:text-2xl font-mainFont">
                  {item.price} 포인트
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={clsx(
              'p-2 rounded',
              currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-200'
            )}
          >
            <ChevronLeft size={16} className="text-darkWalnut" />
          </button>
          <span className="text-darkWalnut text-base font-gothicFont">
            {currentPage + 1}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className={clsx(
              'p-2 rounded',
              currentPage === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-200'
            )}
          >
            <ChevronRight size={16} className="text-darkWalnut" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default NicknameColorModal

