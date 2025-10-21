import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useResponsiveStore } from '@/common/hooks/useResponsiveStore'
import { useShopStore } from '../stores/useShopStore'
import { useShopPurchase } from '../hooks/useShopPurchase'
import MiniModal from '@/common/components/MiniModal'
import clsx from 'clsx'

interface BorderShopModalProps {
  isOpen: boolean
  onClose: () => void
}

const BorderShopModal: React.FC<BorderShopModalProps> = ({ isOpen, onClose }) => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'
  const [currentPage, setCurrentPage] = useState(0)
  
  const { getItemsByType, loading } = useShopStore()
  const borderItems = getItemsByType('BORDER')

  // 공통 구매 로직 훅 사용
  const { purchasingItemId, miniModal, handlePurchaseClick, closeMiniModal } = useShopPurchase()

  const itemsPerPage = isMobile ? 2 : 4
  const totalPages = Math.ceil(borderItems.length / itemsPerPage)

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  const displayedItems = borderItems.slice(
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
          테두리
        </h2>

        {/* 테두리 아이템 그리드 */}
        <div
          className={clsx(
            'grid gap-6 mb-8',
            isMobile ? 'grid-cols-2' : 'grid-cols-4'
          )}
        >
          {loading ? (
            <div className="col-span-full text-center text-darkWalnut font-mainFont">
              로딩 중...
            </div>
          ) : borderItems.length === 0 ? (
            <div className="col-span-full text-center text-darkWalnut font-mainFont">
              테두리 아이템이 없습니다.
            </div>
          ) : (
            displayedItems.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                {/* S3 이미지로 테두리 프리뷰 */}
                <div className="relative mb-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className={clsx('rounded-full object-cover', isMobile ? 'w-32 h-32' : 'w-48 h-48')}
                    onError={(e) => {
                      // 이미지 로드 실패 시 기본 원형 배경
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling?.classList.remove('hidden')
                    }}
                  />
                  {/* Fallback 원형 배경 */}
                  <div className={clsx('bg-black rounded-full hidden', isMobile ? 'w-32 h-32' : 'w-48 h-48')} />
                </div>
                
                {/* 아이템 이름 */}
                <p className="text-darkWalnut font-mainFont text-sm lg:text-base mb-2">
                  {item.name}
                </p>
                
                {/* 가격 */}
                <div className="flex items-center mb-3">
                  <img src="/images/MoonRabbitSleep2.png" alt="달토끼" className={clsx(isMobile ? "w-10 h-10" : "w-12 h-12", "mr-2")} />
                  <span className={clsx("text-darkWalnut font-mainFont", isMobile ? "text-sm" : "text-lg lg:text-2xl")}>
                    {item.price} 포인트
                  </span>
                </div>

                {/* 구매 버튼 */}
                <button
                  onClick={() => handlePurchaseClick(item.id, item.price)}
                  disabled={purchasingItemId === item.id}
                  className={clsx(
                    'px-6 py-2 rounded-full font-mainFont text-white transition-colors',
                    purchasingItemId === item.id
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-mainColor hover:bg-opacity-80 cursor-pointer'
                  )}
                >
                  {purchasingItemId === item.id ? '구매 중...' : '구매하기'}
                </button>
              </div>
            ))
          )}
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

      {/* 미니 모달 */}
      <MiniModal
        isOpen={miniModal.isOpen}
        onClose={closeMiniModal}
        type={miniModal.type}
        title={miniModal.title}
        message={miniModal.message}
        onConfirm={miniModal.onConfirm}
      />
    </div>
  )
}

export default BorderShopModal

