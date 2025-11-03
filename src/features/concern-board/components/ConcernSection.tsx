import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from '@/api/axios'
import { ENDPOINTS } from '@/api/endpoints'
import CategoryBar from '@/common/components/CategoryBar'
import { useResponsiveStore } from '@/common/hooks/useResponsiveStore'

import ConcernCard from '../components/ConcernCard'

interface ConcernCardData {
  id: number
  profileImage: string
  title: string
  category: string
  content: string
  recentComment: { author: string; text: string }
  date?: string
  borderImageUrl?: string
  nicknameColor?: string
  isAnonymous?: boolean
}

const ConcernSection: React.FC = () => {
  const res = useResponsiveStore((state) => state.res)
  const columns = res === 'pc' ? 3 : 1
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [totalBoards, setTotalBoards] = useState<number | null>(null)
  const [cards, setCards] = useState<ConcernCardData[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await axios.get(ENDPOINTS.TOTAL_BOARD_COUNT, {
          withCredentials: true,
        })
        const count = res.data?.totalCount
        setTotalBoards(typeof count === 'number' ? count : null)
      } catch {
        setTotalBoards(null)
      }
    }
    fetchTotal()
  }, [])

  // 목록 조회 (첫 페이지)
  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await axios.get(ENDPOINTS.CONCERN_LIST(0, 9), {
          withCredentials: true,
        })
        const content = res.data?.content || []
        const mapped: ConcernCardData[] = content.map((b: any) => {
          const firstAnswer =
            Array.isArray(b.answers) && b.answers.length > 0
              ? b.answers[0]
              : null
          return {
            id: b.boardId,
            profileImage: b.profileImg || '/images/MoonRabbitSleep2.png',
            title: b.title,
            category: b.category,
            content: b.content,
            recentComment: firstAnswer
              ? {
                  author: firstAnswer.nickname || '달토끼',
                  text: firstAnswer.content,
                }
              : {
                  author: '달토끼',
                  text: '아직 답변이 없어요. 첫 답변을 남겨보세요!',
                },
            date: firstAnswer?.createdAt
              ? String(firstAnswer.createdAt).split('T')[0]
              : undefined,
            isAnonymous: b.anonymous,
          }
        })
        setCards(mapped)
      } catch {
        setCards([])
      }
    }
    fetchList()
  }, [])

  const filteredConcerns =
    selectedCategory === '전체'
      ? cards
      : cards.filter((concern) => concern.category === selectedCategory)

  const displayedConcerns =
    res === 'pc' ? filteredConcerns : filteredConcerns.slice(0, 3)

  return (
    <section className="w-full max-w-[1920px] mx-auto px-[47px] my-20">
      <h2 className="text-2xl text-center text-darkWalnut font-mainFont mb-4">
        달토끼의 밤하늘
      </h2>
      <p className="text-[1.2rem] text-center text-lightWalnut font-mainFont mb-8">
        {totalBoards === null
          ? '밤하늘의 고민 수를 불러오는 중이에요...'
          : `벌써 ${totalBoards.toLocaleString()}개의 고민들이 밤하늘을 수놓고 있어요.`}
      </p>
      <div className="mb-8">
        <CategoryBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>
      <div
        className={clsx(
          'grid gap-6 mx-auto max-w-[1800px]',
          columns === 3 ? 'grid-cols-3' : 'grid-cols-1',
        )}
      >
        {displayedConcerns.map((concern) => (
          <ConcernCard
            key={concern.id}
            id={concern.id}
            profileImage={concern.profileImage}
            title={concern.title}
            category={concern.category}
            content={concern.content}
            recentComment={concern.recentComment}
            date={concern.date}
            isAnonymous={concern.isAnonymous}
            onClick={(id) => navigate(`/night-sky/${id}`)}
          />
        ))}
      </div>
    </section>
  )
}

export default ConcernSection
