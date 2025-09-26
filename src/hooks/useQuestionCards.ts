import { useState, useEffect } from 'react'
import axios from 'axios'
import { ENDPOINTS } from '../api/endpoints'
import { Question } from '../types/question'
import { mockQuestionCards } from '../types/questionCard'

export const useQuestionCards = () => {
  const [todayQuestion, setTodayQuestion] = useState<Question | null>(null)
  const [loading, setLoading] = useState(true)
  const [likedCards, setLikedCards] = useState<Set<number>>(new Set())

  useEffect(() => {
    const fetchTodayQuestion = async () => {
      try {
        const response = await axios.get(ENDPOINTS.TODAY_QUESTION)
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
        const newSet = new Set([...prev])
        newSet.delete(cardIndex)
        return newSet
      })
    } else {
      setLikedCards(prev => new Set([...prev, cardIndex]))
    }
  }

  return {
    todayQuestion,
    loading,
    likedCards,
    handleLikeClick,
    questionCards: mockQuestionCards
  }
}
