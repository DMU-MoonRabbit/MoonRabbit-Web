import clsx from 'clsx'
import React, { memo, useState, useEffect } from 'react'

import bannerBackgroundImg from '@/assets/images/bannerBackground.png'
import borderBackgroundImg from '@/assets/images/borderBackground.png'
import nicknameBackgroundImg from '@/assets/images/nicknameBackground.png'
import PageHeader from '@/common/components/PageHeader'
import StarBackground from '@/common/components/StarBackground'
import { useResponsiveStore } from '@/common/hooks/useResponsiveStore'
import NicknameColorModal from '@/features/mypage/components/NicknameColorModal'
import { useUserProfileStore } from '@/features/mypage/stores/useUserProfileStore'
import BannerShopModal from '@/features/shop/components/BannerShopModal'
import BorderShopModal from '@/features/shop/components/BorderShopModal'
import { useShopStore } from '@/features/shop/stores/useShopStore'

const ShopPage: React.FC = memo(() => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false)
  const [isBorderModalOpen, setIsBorderModalOpen] = useState(false)
  const [isNicknameColorModalOpen, setIsNicknameColorModalOpen] =
    useState(false)

  const { fetchShopItems } = useShopStore()
  const { userProfile, fetchUserProfile } = useUserProfileStore()

  useEffect(() => {
    fetchShopItems()
    fetchUserProfile()
  }, [fetchShopItems, fetchUserProfile])

  const shopItems = [
    {
      id: 1,
      name: '배너',
      image: bannerBackgroundImg,
      type: 'banner',
      price: 100,
      onClick: () => setIsBannerModalOpen(true),
    },
    {
      id: 2,
      name: '테두리',
      image: borderBackgroundImg,
      type: 'border',
      price: 150,
      onClick: () => setIsBorderModalOpen(true),
    },
    {
      id: 3,
      name: '닉네임 색상',
      image: nicknameBackgroundImg,
      type: 'nameColor',
      price: 200,
      onClick: () => setIsNicknameColorModalOpen(true),
    },
  ]

  return (
    <div className="min-h-screen bg-lightBeige relative overflow-hidden">
      <StarBackground isMobile={isMobile} />

      <div className="container mx-auto px-4 py-8 lg:py-16 relative z-10">
        <PageHeader showSubtitle={true} subtitleText="상점" />

        {/* 보유 포인트 표시 */}
        <div className="flex justify-center mb-8">
          <div className="relative flex items-center">
            <img
              src="/images/point.png"
              alt="포인트"
              className={clsx(isMobile ? 'w-16 h-8' : 'w-20 h-10')}
            />
            <span
              className={clsx(
                'absolute ml-5 inset-0 flex items-center justify-center font-mainFont text-darkWalnut font-bold',
                isMobile ? 'text-base' : 'text-lg',
              )}
            >
              {userProfile?.point !== undefined ? userProfile.point : 0}
            </span>
          </div>
        </div>

        {/* 상품 그리드 */}
        <div
          className={clsx(
            'grid gap-6 lg:gap-8 max-w-7xl mx-auto',
            isMobile ? 'grid-cols-1' : 'grid-cols-3',
          )}
        >
          {shopItems.map((item) => (
            <div
              key={item.id}
              onClick={item.onClick}
              className={clsx(
                'relative rounded-[10px] border-3 border-mainColor overflow-hidden',
                'bg-white/25 backdrop-blur-sm',
                'transition-transform duration-200 hover:scale-105 cursor-pointer',
                isMobile ? 'h-80' : 'h-80',
              )}
            >
              {/* 상품 이미지 */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover absolute inset-0"
              />

              {/* 오버레이 */}
              <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center">
                <h3 className="text-darkWalnut text-2xl lg:text-3xl font-normal font-mainFont">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 배너 상점 모달 */}
      <BannerShopModal
        isOpen={isBannerModalOpen}
        onClose={() => setIsBannerModalOpen(false)}
      />

      {/* 테두리 상점 모달 */}
      <BorderShopModal
        isOpen={isBorderModalOpen}
        onClose={() => setIsBorderModalOpen(false)}
      />

      {/* 닉네임 색상 모달 */}
      <NicknameColorModal
        isOpen={isNicknameColorModalOpen}
        onClose={() => setIsNicknameColorModalOpen(false)}
      />
    </div>
  )
})

export default ShopPage
