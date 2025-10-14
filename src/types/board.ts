interface BoardPost {
  boardId: number
  userId: number
  title: string
  content: string
  category: string
  answers: Answer[]
  nickname: string
  profileImg: string
  selectedAnswerId: number
  likeCount: number
  equippedItems: EquippedItem[]
}

interface Answer {
  id: number
  content: string
  createdAt: string
  likeCount: number
  reportCount: number
  parentId: number
  userId: number
  nickname: string
  profileImg: string
  equippedItems: EquippedItem[]
  likedByMe: boolean
  selected: boolean
}

interface EquippedItem {
  type: string
  imageUrl: string
}

export interface BoardPageData {
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
  size: number
  content: BoardPost[]
  number: number
  sort: any[]
  numberOfElements: number
  pageable: any
  empty: boolean
}