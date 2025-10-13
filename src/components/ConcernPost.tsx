import React, { useEffect } from 'react'
import { useUnifiedConcernStore } from '../stores/useUnifiedConcernStore'
import { useCommentStore, Comment } from '../stores/useCommentStore'
import { useParams, useNavigate } from 'react-router-dom'
import { useBoardDetailStore } from '../stores/useBoardDetailStore'
import { usePostAuthorItems } from '../hooks/usePostAuthorItems'
import CommentIcon from '../assets/images/Comment.svg'
import Report from '../assets/images/Report.svg'
import Like from '../assets/images/likeThick.svg'
import Liked from '../assets/images/likedThick.svg'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import axios from 'axios'
import clsx from 'clsx'
import { ENDPOINTS } from '../api/endpoints'
import { useResponsiveStore } from '../stores/useResponsiveStore'

export const ConcernContent: React.FC = () => {
  const { concern, setConcern, toggleConcernLike, concerns } = useUnifiedConcernStore()
  const { comments } = useCommentStore()
  const getTotalCommentCount = (list: Comment[] = []): number =>
    list.reduce((acc, c) => acc + 1 + getTotalCommentCount(c.replies ?? []), 0)
  const totalCommentCount = getTotalCommentCount(comments)

  const { pageNumber } = useParams()
  const currentId = Number(pageNumber)
  const currentIndex = concerns.findIndex((c) => c.id === currentId)
  const navigate = useNavigate()
  const goToPrev = () => {
    if (currentIndex > 0) {
      const prevId = concerns[currentIndex - 1].id
      navigate(`/night-sky/${prevId}`)
    }
  }
  const goToNext = () => {
    if (currentIndex < concerns.length - 1) {
      const nextId = concerns[currentIndex + 1].id
      navigate(`/night-sky/${nextId}`)
    }
  }

  const { res } = useResponsiveStore()
  const isMobile = res === 'mo'

  useEffect(() => {
    if (pageNumber) {
      const boardId = Number(pageNumber)
      const fetchConcern = async() => {
      try {
        const response = await axios.get(
          ENDPOINTS.CONCERN_DETAIL(boardId),
        )
        const data = response.data
        const concern = {
          id: data.id,
          userId: data.userId,  // userId 포함
          title: data.title,
          profileImg: data.profileImg,
          nickname: data.nickname,
          content: data.content,
          createdAt: data.createdAt,
          answer: data.answer,
          like: false
        }
        setConcern(concern)
      } catch (error) {
        console.error('게시글 정보 불러오기 실패', error)
      }
    }
    fetchConcern()
    }
  }, [pageNumber, setConcern])

  // 커스텀 훅은 조건부 리턴 전에 호출
  const { isOwner, borderImageUrl, nicknameColor } = usePostAuthorItems(concern?.userId)

  if (!concern) return <p>로딩 중...</p>
  const { title, nickname, profileImg, content, createdAt, userId } = concern

  return (
    <div className="flex items-center justify-center w-full">
      {!isMobile && (
        <ChevronLeft
          size={32}
          className="cursor-pointer text-darkWalnut hover:text-mainColor transition-colors"
          onClick={goToPrev}
        />
      )}
      <div className={clsx(
        "text-darkWalnut font-mainFont bg-mainWhite h-auto rounded-[40px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]",
        isMobile ? "w-[calc(100%-2rem)] mx-auto p-8 mt-8 mb-12" : "w-4/5 p-[50px] pb-[32px] mx-2 my-24 "
      )}>
        <p className={clsx(isMobile ? "text-[24px]" : "text-[30px]")}>{title}</p>
        <div className={clsx("flex items-center", isMobile ? "my-4" : "my-5")}>
          {/* 프로필 이미지 + 테두리 */}
          <div className="relative w-[30px] h-[30px] mr-[12px]">
            <img
              src={profileImg?.trim() || '/images/MoonRabbitSleep2.png'}
              alt="프로필이미지"
              className="w-full h-full rounded-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = '/images/MoonRabbitSleep2.png'
              }}
            />
            {/* 장착된 테두리 - 본인 게시글일 때만 표시 */}
            {borderImageUrl && (
              <img
                src={borderImageUrl}
                alt="프로필 테두리"
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
              />
            )}
          </div>
          <p 
            className="text-[16px]"
            style={nicknameColor ? { color: nicknameColor } : {}}
          >
            {nickname}
          </p>
        </div>
        <p className={clsx("whitespace-pre-line break-words font-gothicFont", 
          isMobile ? "text-[16px]" : "text-[18px] leading-tight"
        )}>
          {content}
        </p>
        <div className="flex mt-[40px] md:mt-[60px] justify-between">
          <div className="flex items-center">
            <img src={CommentIcon} alt="댓글아이콘" className="h-[24px]" loading="lazy" />
            <p className="mt-[2px] ml-[4px] mr-[20px] text-[20px]">
              {totalCommentCount}
            </p>
            <img
              src={Report}
              alt="신고"
              className="mr-[16px] cursor-pointer h-[25px]"
              loading="lazy"
            />
            <div onClick={toggleConcernLike}>
              <img
                src={concern?.like ? Liked : Like}
                className="cursor-pointer h-[25px]"
                loading="lazy"
              />
            </div>
          </div>
          <p>{createdAt}</p>
        </div>
      </div>
      {!isMobile && (
        <ChevronRight
          size={32}
          className="cursor-pointer text-darkWalnut hover:text-mainColor transition-colors"
          onClick={goToNext}
        />
      )}
    </div>
  )
}

export const ConcernAnswer: React.FC = () => {
  const { boardDetail } = useBoardDetailStore()
  const { res } = useResponsiveStore()
  const isMobile = res === 'mo'
  
  return (
    <div className={clsx("text-darkWalnut font-mainFont bg-mainWhite h-auto rounded-[40px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]",
      isMobile ? "w-[calc(100%-2rem)] mx-auto p-8" : "w-4/5 p-[50px]"
    )}>
      <p className="text-[24px] md:text-[30px] mb-[20px]">달토끼 답변</p>
      <p className="whitespace-pre-line break-words font-gothicFont text-[16px] md:text-[18px] md:leading-tight">
        {boardDetail?.aiAnswer || 'AI 답변을 불러오는 중입니다...'}
      </p>
    </div>
  )
}
