// 사용자 프로필 관련 타입 정의
export interface UserProfile {
  id: number
  nickname: string
  email: string
  password?: string
  profileImg?: string  // 백엔드 API 응답 필드명
  profileImage?: string  // 프론트엔드 호환성을 위한 별칭
  level: number
  point: number
  trustPoint: number
  createdAt?: string
  updatedAt?: string
  totalPoint: number
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

// API 응답에서 제공되는 장착 아이템 타입
export interface EquippedItem {
  type: 'BORDER' | 'NAME_COLOR'
  imageUrl: string
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
