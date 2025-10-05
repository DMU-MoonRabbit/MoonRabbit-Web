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
