import React, { useState, useEffect } from 'react'

import { ShopItem } from '@/features/shop/types/shop'

import { AdminModal } from './AdminModal'

interface ItemEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (
    itemId: number,
    name: string,
    price: number,
    imageUrl: string,
  ) => Promise<void>
  item: ShopItem | null
}

export const ItemEditModal: React.FC<ItemEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  item,
}) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  // 아이템 데이터로 폼 초기화
  useEffect(() => {
    if (item) {
      setName(item.name)
      setPrice(item.price.toString())
      setImageUrl(item.imageUrl)
    }
  }, [item])

  const handleSave = async () => {
    if (!item) return

    if (!name.trim()) {
      alert('아이템 이름을 입력해주세요.')
      return
    }

    if (!price.trim()) {
      alert('가격을 입력해주세요.')
      return
    }

    const priceNum = parseInt(price)
    if (isNaN(priceNum) || priceNum < 0) {
      alert('올바른 가격을 입력해주세요.')
      return
    }

    if (!imageUrl.trim()) {
      alert('이미지 URL을 입력해주세요.')
      return
    }

    setLoading(true)
    try {
      await onSave(item.id, name.trim(), priceNum, imageUrl.trim())
      onClose()
    } catch {
      // 에러 처리
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      onClose()
    }
  }

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={handleClose}
      title={`아이템 수정 (ID: ${item?.id || ''})`}
      disabled={loading}
    >
      {/* 아이템 이름 입력 */}
      <div className="mb-6">
        <label className="block text-sm font-mainFont text-darkWalnut mb-2">
          아이템 이름 *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-2 border-lightBeige rounded-lg px-4 py-3 focus:outline-none focus:border-mainColor transition-colors font-gothicFont text-darkWalnut"
          placeholder="아이템 이름을 입력하세요"
          maxLength={50}
          disabled={loading}
        />
        <div className="text-right text-xs text-gray-500 mt-1">
          {name.length}/50
        </div>
      </div>

      {/* 가격 입력 */}
      <div className="mb-6">
        <label className="block text-sm font-mainFont text-darkWalnut mb-2">
          가격 *
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border-2 border-lightBeige rounded-lg px-4 py-3 focus:outline-none focus:border-mainColor transition-colors font-gothicFont text-darkWalnut"
          placeholder="가격을 입력하세요"
          min="0"
          disabled={loading}
        />
      </div>

      {/* 이미지 URL 입력 */}
      <div className="mb-6">
        <label className="block text-sm font-mainFont text-darkWalnut mb-2">
          이미지 URL *
        </label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border-2 border-lightBeige rounded-lg px-4 py-3 focus:outline-none focus:border-mainColor transition-colors font-gothicFont text-darkWalnut"
          placeholder="이미지 URL을 입력하세요"
          disabled={loading}
        />
      </div>

      {/* 이미지 미리보기 */}
      {imageUrl && (
        <div className="mb-6">
          <label className="block text-sm font-mainFont text-darkWalnut mb-2">
            이미지 미리보기
          </label>
          <div className="flex justify-center">
            <img
              src={imageUrl}
              alt="미리보기"
              className="w-24 h-24 object-cover rounded-lg border border-gray-200"
              onError={(e) => {
                e.currentTarget.src = '/images/MoonRabbitLogo.png'
              }}
            />
          </div>
        </div>
      )}

      {/* 버튼 영역 */}
      <div className="flex justify-center gap-3">
        <button
          onClick={handleClose}
          className="px-6 py-2 rounded-full font-mainFont text-darkWalnut bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          취소
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 rounded-full font-mainFont text-white bg-mainColor hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          disabled={loading}
        >
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          {loading ? '수정 중...' : '수정하기'}
        </button>
      </div>
    </AdminModal>
  )
}
