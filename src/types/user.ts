// 사용자 프로필 관련 타입 정의
export interface UserProfile {
  userId: number
  nickname: string
  email: string
  profileImage?: string
  level: number
  totalPoint: number
  trustPoint: number
  createdAt: string
  updatedAt: string
}

// 사용자 아이템 관련 타입 정의
export interface UserItem {
  userItemId: number
  itemId: number
  itemName: string
  itemDescription?: string
  itemImage?: string
  itemType: string
  isEquipped: boolean
  purchasedAt: string
}

// 사용자 인벤토리 응답 타입
export interface UserInventory {
  userId: number
  items: UserItem[]
  totalItems: number
}

// 좋아요한 게시글 타입
export interface LikedBoard {
  boardId: number
  title: string
  content: string
  category: string
  likeCount: number
  commentCount: number
  createdAt: string
  author: {
    userId: number
    nickname: string
    profileImage?: string
  }
}
