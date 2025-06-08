import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ConcernContent, ConcernAnswer } from '../components/ConcernPost'
import { ConcernComment } from '../components/ConcernComment'
import { useBoardDetailStore } from '../stores/useBoardDetailStore'

const NightSkyDetailPage: React.FC = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>()
  const { boardDetail, isLoading, error, fetchBoardDetail } =
    useBoardDetailStore()

  useEffect(() => {
    if (pageNumber) {
      fetchBoardDetail(parseInt(pageNumber))
    }
  }, [pageNumber, fetchBoardDetail])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    )
  }

  if (!boardDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">게시글을 찾을 수 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <ConcernContent
        title={boardDetail.title}
        content={boardDetail.content}
        category={boardDetail.category}
        date={
          new Date(boardDetail.answers[0]?.createdAt || new Date())
            .toISOString()
            .split('T')[0]
        }
      />
      <ConcernAnswer answers={boardDetail.answers} />
      <ConcernComment />
    </div>
  )
}

export default NightSkyDetailPage
