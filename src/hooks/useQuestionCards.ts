import { useState, useEffect } from 'react'
import axios from 'axios'
import { ENDPOINTS } from '../api/endpoints'
import { DailyQuestion, DailyAnswerRequest, DailyAnswerResponse } from '../types/question'
import { mockQuestionCards } from '../types/questionCard'

export const useQuestionCards = () => {
  const [todayQuestion, setTodayQuestion] = useState<DailyQuestion | null>(null)
  const [loading, setLoading] = useState(true)
  const [likedCards, setLikedCards] = useState<Set<number>>(new Set())
  const [submitting, setSubmitting] = useState(false)
  const [myAnswer, setMyAnswer] = useState<DailyAnswerResponse | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchTodayQuestion = async () => {
      try {
        const response = await axios.get<DailyQuestion>(ENDPOINTS.DAILY_QUESTION)
        setTodayQuestion(response.data)
      } catch (error) {
        console.error('오늘의 질문 조회 실패:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTodayQuestion()
  }, [])

  const handleLikeClick = (cardIndex: number) => {
    if (likedCards.has(cardIndex)) {
      setLikedCards(prev => {
        const newSet = new Set(Array.from(prev))
        newSet.delete(cardIndex)
        return newSet
      })
    } else {
      setLikedCards(prev => new Set(Array.from(prev).concat(cardIndex)))
    }
  }

  // 오늘의 질문에 답변 제출/수정
  const submitAnswer = async (answer: string): Promise<DailyAnswerResponse | null> => {
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
            Authorization: token ? `Bearer ${token}` : ''
          },
          withCredentials: true // 인증 필요
        }
      )
      setMyAnswer(response.data)
      setIsEditing(false)
      return response.data
    } catch (error) {
      console.error('답변 제출 실패:', error)
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
    questionCards: mockQuestionCards,
    submitAnswer,
    submitting,
    myAnswer,
    isEditing,
    startEditing,
    cancelEditing
  }
}
