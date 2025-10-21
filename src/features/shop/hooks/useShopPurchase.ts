import { useState } from 'react'
import { useShopStore } from '../stores/useShopStore'
import { useUserProfileStore } from '@/features/mypage/stores/useUserProfileStore'

interface MiniModalState {
  isOpen: boolean
  type: 'success' | 'error' | 'confirm'
  title?: string
  message: string
  onConfirm?: () => void
}

/**
 * 상점 아이템 구매 로직을 처리하는 커스텀 훅
 * 포인트 체크, 구매 확인, API 호출, 프로필 갱신까지 처리
 */
export const useShopPurchase = () => {
  const [purchasingItemId, setPurchasingItemId] = useState<number | null>(null)
  const [miniModal, setMiniModal] = useState<MiniModalState>({
    isOpen: false,
    type: 'success',
    message: '',
  })

  const { purchaseItem, purchaseLoading } = useShopStore()
  const { userProfile, fetchUserProfile, fetchUserInventory } = useUserProfileStore()

  const handlePurchaseClick = (itemId: number, itemPrice: number) => {
    if (purchaseLoading) return

    // 포인트 부족 체크
    if (userProfile && userProfile.point < itemPrice) {
      setMiniModal({
        isOpen: true,
        type: 'error',
        title: '포인트 부족',
        message: '포인트가 부족합니다.',
      })
      return
    }

    // 구매 확인 모달
    setMiniModal({
      isOpen: true,
      type: 'confirm',
      title: '구매 확인',
      message: '이 아이템을 구매하시겠습니까?',
      onConfirm: () => handlePurchase(itemId),
    })
  }

  const handlePurchase = async (itemId: number) => {
    setPurchasingItemId(itemId)

    if (!userProfile?.id) {
      setMiniModal({
        isOpen: true,
        type: 'error',
        title: '오류',
        message: '사용자 정보를 찾을 수 없습니다.',
      })
      setPurchasingItemId(null)
      return
    }

    try {
      const result = await purchaseItem(userProfile.id, itemId)
      
      // 프로필 및 인벤토리 갱신 (강제 재로드)
      await fetchUserProfile(true)
      await fetchUserInventory(userProfile.id)

      setMiniModal({
        isOpen: true,
        type: 'success',
        title: '구매 완료',
        message: result.message || '아이템을 구매했습니다!',
      })
    } catch (error: unknown) {
      const err = error as { message?: string }
      setMiniModal({
        isOpen: true,
        type: 'error',
        title: '구매 실패',
        message: err.message || '구매에 실패했습니다.',
      })
    } finally {
      setPurchasingItemId(null)
    }
  }

  const closeMiniModal = () => {
    setMiniModal({
      isOpen: false,
      type: 'success',
      message: '',
    })
  }

  return {
    purchasingItemId,
    miniModal,
    handlePurchaseClick,
    closeMiniModal,
  }
}

