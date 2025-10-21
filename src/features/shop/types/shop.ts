// 상점 아이템 타입 정의 (백엔드 API 응답 기반)

export interface ShopItem {
  id: number
  name: string
  price: number
  type: 'BANNER' | 'BORDER' | 'NAME_COLOR'
  equippable: boolean
  imageUrl: string // S3 URL
}

export interface ShopItemListResponse {
  content: ShopItem[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    offset: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalElements: number
  totalPages: number
  first: boolean
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  numberOfElements: number
  empty: boolean
}

export interface PurchaseRequest {
  itemId: number
}

export interface PurchaseResponse {
  success: boolean
  message: string
  userItem?: {
    userItemId: number
    itemId: number
    itemName: string
    itemImage: string
    purchasedAt: string
  }
  remainingPoints?: number
}
