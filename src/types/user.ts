// 사용자 프로필 관련 타입 정의
export interface UserProfile {
  id: number
  userId?: number
  nickname: string
  email: string
  password?: string
  profileImage?: string
  level: number
  point: number
  trustPoint: number
  createdAt?: string
  updatedAt?: string
}

// 사용자 아이템 관련 타입 정의 (백엔드 API 응답 기반)
export interface UserItem {
  id: number  // userItemId
  itemId: number
  itemName: string
  price: number
  type: string  // itemType
  equipped: boolean  // isEquipped
  createdAt: string  // purchasedAt
  imageUrl: string  // itemImage
  content?: string  // itemDescription
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
