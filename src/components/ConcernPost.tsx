import React, { useEffect } from 'react'
import { useUnifiedConcernStore } from '../stores/useUnifiedConcernStore'
import { useCommentStore, Comment } from '../stores/useCommentStore'
import { useParams, useNavigate } from 'react-router-dom'
import { useBoardDetailStore } from '../stores/useBoardDetailStore'
import CommentIcon from '../assets/images/Comment.svg'
import Report from '../assets/images/Report.svg'
import Like from '../assets/images/likeThick.svg'
import Liked from '../assets/images/likedThick.svg'
import PrevArrow from '../assets/images/PrevArrow.svg'
import NextArrow from '../assets/images/NextArrow.svg'
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

  if (!concern) return <p>로딩 중...</p>
  const { title, nickname, profileImg, content, createdAt } = concern

  return (
    <div className="flex items-center justify-center w-full">
      {!isMobile && (
        <img
          src={PrevArrow}
          alt="이전 고민"
          onClick={goToPrev}
          className="cursor-pointer"
          loading="lazy"
        />
      )}
      <div className={clsx(
        "text-darkWalnut font-mainFont bg-mainWhite h-auto rounded-[40px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]",
        isMobile ? "w-[calc(100%-2rem)] mx-auto p-8 mt-8 mb-12" : "w-4/5 p-[50px] pb-[32px] mx-2 my-24 "
      )}>
        <p className={clsx(isMobile ? "text-[24px]" : "text-[30px]")}>{title}</p>
        <div className={clsx("flex items-center", isMobile ? "my-4" : "my-5")}>
          <img
            src={profileImg?.trim() || '/images/MoonRabbitSleep2.png'}
            alt="프로필이미지"
            className="w-[30px] h-[30px] rounded-[50%] mr-[12px]"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = '/images/MoonRabbitSleep2.png'
            }}
          />
          <p className="text-[16px]">{nickname}</p>
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
        <img
          src={NextArrow}
          alt="다음 고민"
          onClick={goToNext}
          className="cursor-pointer"
          loading="lazy"
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
