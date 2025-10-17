// 신고 생성 요청 타입
export interface ReportCreateRequest {
  targetType: 'BOARD' | 'ANSWER'
  targetId: number
  reason: string
}

// 신고 생성 응답 타입
export interface ReportCreateResponse {
  id: number
  reportTargetType: 'BOARD' | 'ANSWER'
  targetId: number
  targetContent: string
  reason: string
  reporterId: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
}
