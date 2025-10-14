export interface User {
  id: number
  email: string
  nickname: string
  point: number
  trustPoint: number
  totalPoint: number
  level: number
  createdAt: string
  content: string
}

export interface AdminUserResponse {
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
  size: number
  content: User[]
  number: number
  sort: Array<{
    direction: string
    nullHandling: string
    ascending: boolean
    property: string
    ignoreCase: boolean
  }>
  numberOfElements: number
  pageable: {
    offset: number
    sort: Array<{
      direction: string
      nullHandling: string
      ascending: boolean
      property: string
      ignoreCase: boolean
    }>
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  empty: boolean
}

// 신고 관련 타입
export interface Report {
  id: number
  reportTargetType: 'BOARD' | 'ANSWER'
  targetId: number
  targetContent: string
  reason: string
  reporterId: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
}

export interface AdminReportsResponse {
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
  size: number
  content: Report[]
  number: number
  sort: Array<{
    direction: string
    nullHandling: string
    ascending: boolean
    property: string
    ignoreCase: boolean
  }>
  numberOfElements: number
  pageable: {
    offset: number
    sort: Array<{
      direction: string
      nullHandling: string
      ascending: boolean
      property: string
      ignoreCase: boolean
    }>
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  empty: boolean
}

// 게시글 수정 요청 타입
export interface BoardUpdateRequest {
  title: string
  content: string
  category: string
  anonymous: boolean
}