import { create } from 'zustand'

import axios from '@/api/axios'
import { ENDPOINTS } from '@/api/endpoints'

import { ShopItem, ShopItemListResponse, PurchaseResponse } from '../types/shop'

interface ShopStore {
  // 상태
  shopItems: ShopItem[]
  loading: boolean
  error: string | null
  purchaseLoading: boolean
  purchaseError: string | null

  // 액션
  fetchShopItems: () => Promise<void>
  purchaseItem: (userId: number, itemId: number) => Promise<PurchaseResponse>
  getItemsByType: (
    type: 'BANNER' | 'BORDER' | 'NICKNAME_COLOR' | 'NAME_COLOR',
  ) => ShopItem[]
  clearError: () => void
}

export const useShopStore = create<ShopStore>((set, get) => ({
  // 초기 상태
  shopItems: [],
  loading: false,
  error: null,
  purchaseLoading: false,
  purchaseError: null,

  // 상점 아이템 목록 조회
  fetchShopItems: async () => {
    try {
      set({ loading: true, error: null })

      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        throw new Error('로그인이 필요합니다.')
      }

      const response = await axios.get<ShopItemListResponse>(
        ENDPOINTS.ITEM_LIST,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      set({
        shopItems: response.data.content || [],
        loading: false,
      })
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : '아이템 목록 조회에 실패했습니다.',
        loading: false,
      })
    }
  },

  // 타입별 아이템 필터링
  getItemsByType: (
    type: 'BANNER' | 'BORDER' | 'NICKNAME_COLOR' | 'NAME_COLOR',
  ) => {
    const { shopItems } = get()
    return shopItems.filter((item) => item.type === type)
  },

  // 아이템 구매
  purchaseItem: async (userId: number, itemId: number) => {
    try {
      set({ purchaseLoading: true, purchaseError: null })

      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        throw new Error('로그인이 필요합니다.')
      }

      const response = await axios.post<PurchaseResponse>(
        `${ENDPOINTS.ITEM_BUY}?userId=${userId}&itemId=${itemId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      set({ purchaseLoading: false })
      return response.data
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { message?: string } }
        message?: string
      }
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        '아이템 구매에 실패했습니다.'
      set({
        purchaseError: errorMessage,
        purchaseLoading: false,
      })
      throw new Error(errorMessage)
    }
  },

  // 에러 클리어
  clearError: () => set({ error: null, purchaseError: null }),
}))
