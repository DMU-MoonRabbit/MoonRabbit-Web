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
