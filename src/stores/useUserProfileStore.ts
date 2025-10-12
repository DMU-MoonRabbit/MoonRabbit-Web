import { create } from 'zustand'
import axios from 'axios'
import { ENDPOINTS } from '../api/endpoints'
import { UserProfile, UserInventory, LikedBoard } from '../types/user'

interface UserProfileStore {
  // 상태
  userProfile: UserProfile | null
  userInventory: UserInventory | null
  likedBoards: LikedBoard[]
  loading: boolean
  error: string | null

  // 액션
  fetchUserProfile: () => Promise<void>
  fetchUserInventory: (userId: number) => Promise<void>
  fetchLikedBoards: () => Promise<void>
  equipItem: (userItemId: number) => Promise<void>
  unequipItem: (userItemId: number) => Promise<void>
  clearError: () => void
}

export const useUserProfileStore = create<UserProfileStore>((set, get) => ({
  // 초기 상태
  userProfile: null,
  userInventory: null,
  likedBoards: [],
  loading: false,
  error: null,

  // 사용자 프로필 조회
  fetchUserProfile: async () => {
    try {
      set({ loading: true, error: null })
      
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        throw new Error('로그인이 필요합니다.')
      }

      const response = await axios.get(ENDPOINTS.USER_PROFILE, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      console.log('사용자 프로필 API 응답:', response.data)

      set({ 
        userProfile: response.data,
        loading: false 
      })
    } catch (error) {
      console.error('사용자 프로필 조회 실패:', error)
      set({ 
        error: error instanceof Error ? error.message : '프로필 조회에 실패했습니다.',
        loading: false 
      })
    }
  },

  // 사용자 인벤토리 조회
  fetchUserInventory: async (userId: number) => {
    try {
      set({ loading: true, error: null })
      
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        throw new Error('로그인이 필요합니다.')
      }

      const response = await axios.get(ENDPOINTS.USER_ITEMS(userId), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      console.log('인벤토리 API 응답:', response.data)
      console.log('인벤토리 API 응답 타입:', typeof response.data)
      console.log('인벤토리 items:', response.data.items || response.data.content)

      // 페이지네이션 응답 처리
      const inventoryData = {
        userId,
        items: response.data.content || [],
        totalItems: response.data.totalElements || 0
      }

      console.log('처리된 인벤토리 데이터:', inventoryData)

      set({ 
        userInventory: inventoryData,
        loading: false 
      })
    } catch (error) {
      console.error('사용자 인벤토리 조회 실패:', error)
      set({ 
        error: error instanceof Error ? error.message : '인벤토리 조회에 실패했습니다.',
        loading: false 
      })
    }
  },

  // 좋아요한 게시글 조회
  fetchLikedBoards: async () => {
    try {
      set({ loading: true, error: null })
      
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        throw new Error('로그인이 필요합니다.')
      }

      const response = await axios.get(ENDPOINTS.BOARD_LIKES_MY, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      set({ 
        likedBoards: response.data,
        loading: false 
      })
    } catch (error) {
      console.error('좋아요한 게시글 조회 실패:', error)
      set({ 
        error: error instanceof Error ? error.message : '좋아요한 게시글 조회에 실패했습니다.',
        loading: false 
      })
    }
  },

  // 아이템 장착
  equipItem: async (userItemId: number) => {
    try {
      set({ loading: true, error: null })
      
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        throw new Error('로그인이 필요합니다.')
      }

      await axios.put(ENDPOINTS.USER_ITEM_EQUIP(userItemId), {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      // 인벤토리 다시 조회
      const { userProfile } = get()
      if (userProfile?.id) {
        await get().fetchUserInventory(userProfile.id)
      }

      set({ loading: false })
    } catch (error) {
      console.error('아이템 장착 실패:', error)
      set({ 
        error: error instanceof Error ? error.message : '아이템 장착에 실패했습니다.',
        loading: false 
      })
    }
  },

  // 아이템 해제
  unequipItem: async (userItemId: number) => {
    try {
      set({ loading: true, error: null })
      
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        throw new Error('로그인이 필요합니다.')
      }

      await axios.put(ENDPOINTS.USER_ITEM_UNEQUIP(userItemId), {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      // 인벤토리 다시 조회
      const { userProfile } = get()
      if (userProfile?.id) {
        await get().fetchUserInventory(userProfile.id)
      }

      set({ loading: false })
    } catch (error) {
      console.error('아이템 해제 실패:', error)
      set({ 
        error: error instanceof Error ? error.message : '아이템 해제에 실패했습니다.',
        loading: false 
      })
    }
  },

  // 에러 클리어
  clearError: () => set({ error: null }),
}))
