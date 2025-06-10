import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useBoardDetailStore } from '../stores/useBoardDetailStore'
import { ConcernContent, ConcernAnswer } from '../components/ConcernPost'
import { ConcernComment } from '../components/ConcernComment'

export const NightSkyDetailPage: React.FC = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>()
  const { boardDetail, fetchBoardDetail } = useBoardDetailStore()

  useEffect(() => {
    if (pageNumber) {
      fetchBoardDetail(parseInt(pageNumber))
    }
  }, [pageNumber, fetchBoardDetail])

  if (!boardDetail) {
    return <div>로딩 중...</div>
  }

  return (
    <div className="flex flex-col items-center">
      <ConcernContent />
      <ConcernAnswer />
      <ConcernComment />
    </div>
  )
}
