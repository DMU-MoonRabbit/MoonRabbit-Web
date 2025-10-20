import { create } from 'zustand'
import axios from 'axios'
import { ENDPOINTS } from '../api/endpoints'
import { UserProfile, UserInventory, LikedBoard, UserItem } from '../types/user'
import { NICKNAME_COLOR_MAP } from '../constants/colors'

interface UserProfileStore {
  // 상태
  userProfile: UserProfile | null
  otherUserProfile: UserProfile | null
  userInventory: UserInventory | null
  likedBoards: LikedBoard[]
  loading: boolean
  error: string | null
  isProfileLoaded: boolean

  // 액션
  fetchUserProfile: (force?: boolean) => Promise<void> // 내 프로필 조회
  fetchUserProfileById: (userId: number) => Promise<void> // 타 유저 프로필 조회
  fetchUserInventory: (userId: number) => Promise<void>
  fetchLikedBoards: () => Promise<void>
  equipItem: (userItemId: number) => Promise<void>
  unequipItem: (userItemId: number) => Promise<void>
  clearError: () => void
  resetProfileLoadState: () => void
  clearOtherUserProfile: () => void
  
  // Selectors
  getEquippedBorder: () => UserItem | null
  getEquippedBanner: () => UserItem | null
  getEquippedNicknameColor: () => string | null
}

export const useUserProfileStore = create<UserProfileStore>((set, get) => ({
  // 초기 상태
  userProfile: null,
  otherUserProfile: null,
  userInventory: null,
  likedBoards: [],
  loading: false,
  error: null,
  isProfileLoaded: false,

  // 내 프로필 조회
  fetchUserProfile: async (force = false) => {
    try {
      // 이미 로드되었고 강제 재로드가 아니라면 스킵
      const { isProfileLoaded } = get()
      if (isProfileLoaded && !force) return

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

      // 백엔드 응답의 profileImg를 profileImage로도 매핑
      const userProfile = {
        ...response.data,
        profileImage: response.data.profileImg || response.data.profileImage
      }

      set({ 
        userProfile,
        loading: false,
        isProfileLoaded: true
      })
    } catch (error) {
      console.error('사용자 프로필 조회 실패:', error)
      set({ 
        error: error instanceof Error ? error.message : '프로필 조회에 실패했습니다.',
        loading: false 
      })
    }
  },

  // 타 유저 프로필 조회
  fetchUserProfileById: async (userId: number) => {
    try {
      set({ loading: true, error: null })
      
      const response = await axios.get(ENDPOINTS.USER_PROFILE_BY_ID(userId))

      console.log('다른 사용자 프로필 API 응답:', response.data)

      // 백엔드 응답의 profileImg를 profileImage로도 매핑
      const otherUserProfile = {
        ...response.data,
        profileImage: response.data.profileImg || response.data.profileImage
      }

      set({ 
        otherUserProfile,
        loading: false
      })
    } catch (error) {
      console.error('다른 사용자 프로필 조회 실패:', error)
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

      // 인벤토리 다시 조회 (강제 재로드)
      const { userProfile } = get()
      if (userProfile?.id) {
        await get().fetchUserInventory(userProfile.id)
        await get().fetchUserProfile(true)
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

      // 인벤토리 다시 조회 (강제 재로드)
      const { userProfile } = get()
      if (userProfile?.id) {
        await get().fetchUserInventory(userProfile.id)
        await get().fetchUserProfile(true)
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

  // 프로필 로드 상태 리셋
  resetProfileLoadState: () => set({ isProfileLoaded: false }),

  // 다른 사용자 프로필 클리어
  clearOtherUserProfile: () => set({ otherUserProfile: null }),

  // Selectors - 장착된 아이템 조회
  getEquippedBorder: () => {
    const { userInventory } = get()
    if (!userInventory?.items) return null
    return userInventory.items.find(item => item.type === 'BORDER' && item.equipped) || null
  },

  getEquippedBanner: () => {
    const { userInventory } = get()
    if (!userInventory?.items) return null
    return userInventory.items.find(item => item.type === 'BANNER' && item.equipped) || null
  },

  getEquippedNicknameColor: () => {
    const { userInventory } = get()
    if (!userInventory?.items) return null
    
    const item = userInventory.items.find(item => 
      (item.type === 'NICKNAME_COLOR' || item.type === 'NAME_COLOR') && item.equipped
    )
    
    if (!item) return null
    
    // 아이템 이름으로 색상 찾기
    const itemNameLower = item.itemName.toLowerCase()
    const colorValue = NICKNAME_COLOR_MAP[itemNameLower] || item.content
    
    return colorValue || null
  },
}))
