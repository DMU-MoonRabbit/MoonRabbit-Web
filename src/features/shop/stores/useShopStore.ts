import { create } from 'zustand'
import axios from 'axios'
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
  getItemsByType: (type: 'BANNER' | 'BORDER' | 'NICKNAME_COLOR' | 'NAME_COLOR') => ShopItem[]
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

      const response = await axios.get<ShopItemListResponse>(ENDPOINTS.ITEM_LIST, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      console.log('상점 아이템 목록 API 응답:', response.data)

      set({ 
        shopItems: response.data.content || [],
        loading: false 
      })
    } catch (error) {
      console.error('상점 아이템 목록 조회 실패:', error)
      set({ 
        error: error instanceof Error ? error.message : '아이템 목록 조회에 실패했습니다.',
        loading: false 
      })
    }
  },

  // 타입별 아이템 필터링
  getItemsByType: (type: 'BANNER' | 'BORDER' | 'NICKNAME_COLOR' | 'NAME_COLOR') => {
    const { shopItems } = get()
    return shopItems.filter(item => item.type === type)
  },

  // 아이템 구매
  purchaseItem: async (userId: number, itemId: number) => {
    try {
      set({ purchaseLoading: true, purchaseError: null })
      
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        throw new Error('로그인이 필요합니다.')
      }

      console.log('구매 요청 데이터:', { userId, itemId })

      const response = await axios.post<PurchaseResponse>(
        `${ENDPOINTS.ITEM_BUY}?userId=${userId}&itemId=${itemId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      console.log('아이템 구매 API 응답:', response.data)

      set({ purchaseLoading: false })
      return response.data
    } catch (error: any) {
      console.error('아이템 구매 실패:', error)
      console.error('에러 응답:', error.response?.data)
      const errorMessage = error.response?.data?.message || error.message || '아이템 구매에 실패했습니다.'
      set({ 
        purchaseError: errorMessage,
        purchaseLoading: false 
      })
      throw new Error(errorMessage)
    }
  },

  // 에러 클리어
  clearError: () => set({ error: null, purchaseError: null }),
}))

