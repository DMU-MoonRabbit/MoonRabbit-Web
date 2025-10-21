import axios from 'axios'
import { useState, useEffect } from 'react'

import { ENDPOINTS } from '@/api/endpoints'
import useUserStore from '@/features/mypage/stores/useUserStore'

import {
  DailyQuestion,
  DailyAnswerRequest,
  DailyAnswerResponse,
} from '../types/question'
import { QuestionCard } from '../types/questionCard'

export const useQuestionCards = () => {
  const { nickname } = useUserStore()
  const [todayQuestion, setTodayQuestion] = useState<DailyQuestion | null>(null)
  const [loading, setLoading] = useState(true)
  const [likedCards, setLikedCards] = useState<Set<number>>(new Set())
  const [submitting, setSubmitting] = useState(false)
  const [myAnswer, setMyAnswer] = useState<DailyAnswerResponse | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [questionCards, setQuestionCards] = useState<QuestionCard[]>([])

  useEffect(() => {
    const fetchTodayQuestion = async () => {
      try {
        const response = await axios.get<DailyQuestion>(
          ENDPOINTS.DAILY_QUESTION,
        )
        setTodayQuestion(response.data)
      } catch {
        // 에러 처리
      } finally {
        setLoading(false)
      }
    }

    const fetchMyAnswer = async () => {
      const token = localStorage.getItem('accessToken')
      if (!token) return

      try {
        const response = await axios.get<DailyAnswerResponse>(
          ENDPOINTS.DAILY_ANSWER_ME,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        )

        if (response.data) {
          setMyAnswer(response.data)

          // 답변 카드에도 추가
          const newCard: QuestionCard = {
            type: 'text',
            content: response.data.answerContent,
            answerId: response.data.answerId,
            nickname: nickname || '익명',
            answeredAt: response.data.answeredAt,
            isMyAnswer: true,
          }
          setQuestionCards([newCard])
        }
      } catch {
        // 404 에러는 답변이 없는 경우이므로 무시
      }
    }

    fetchTodayQuestion()
    fetchMyAnswer()
  }, [nickname])

  const handleLikeClick = (cardIndex: number) => {
    if (likedCards.has(cardIndex)) {
      setLikedCards((prev) => {
        const newSet = new Set(Array.from(prev))
        newSet.delete(cardIndex)
        return newSet
      })
    } else {
      setLikedCards((prev) => new Set(Array.from(prev).concat(cardIndex)))
    }
  }

  // 오늘의 질문에 답변 제출/수정
  const submitAnswer = async (
    answer: string,
  ): Promise<DailyAnswerResponse | null> => {
    setSubmitting(true)
    try {
      const token = localStorage.getItem('accessToken')
      const requestData: DailyAnswerRequest = { answer }
      const response = await axios.post<DailyAnswerResponse>(
        ENDPOINTS.DAILY_ANSWER,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
          withCredentials: true, // 인증 필요
        },
      )

      const answerData = response.data
      setMyAnswer(answerData)
      setIsEditing(false)

      // 기존 내 답변이 있으면 제거하고 새로운 답변을 맨 앞에 추가
      setQuestionCards((prev) => {
        const filteredCards = prev.filter((card) => !card.isMyAnswer)
        const newCard: QuestionCard = {
          type: 'text',
          content: answerData.answerContent,
          answerId: answerData.answerId,
          nickname: nickname || '익명',
          answeredAt: answerData.answeredAt,
          isMyAnswer: true,
        }
        return [newCard, ...filteredCards]
      })

      return answerData
    } catch {
      return null
    } finally {
      setSubmitting(false)
    }
  }

  const startEditing = () => {
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setIsEditing(false)
  }

  return {
    todayQuestion,
    loading,
    likedCards,
    handleLikeClick,
    questionCards,
    submitAnswer,
    submitting,
    myAnswer,
    isEditing,
    startEditing,
    cancelEditing,
  }
}
