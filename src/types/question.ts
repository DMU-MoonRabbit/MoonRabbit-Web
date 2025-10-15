export interface Question {
  id: number
  content: string
  createdAt: string
  isAnswered?: boolean
}

export interface Answer {
  id: number
  questionId: number
  content: string
  createdAt: string
}

export interface QuestionAnswer {
  question: Question
  answer?: Answer
}

// 오늘의 질문 API 응답 타입
export interface DailyQuestion {
  id: number
  date: string
  content: string
}

// 오늘의 답변 제출/수정 요청 타입
export interface DailyAnswerRequest {
  answer: string
}

// 오늘의 답변 제출/수정 응답 타입
export interface DailyAnswerResponse {
  answerId: number
  questionId: number
  questionContent: string
  answerContent: string
  answeredAt: string
}
