import React, { useEffect } from 'react'
import { useUnifiedConcernStore } from '../stores/useUnifiedConcernStore'
import { useCommentStore, Comment } from '../stores/useCommentStore'
import { useParams, useNavigate } from 'react-router-dom'
import { useBoardDetailStore } from '../stores/useBoardDetailStore'
import CommentIcon from '../assets/images/Comment.svg'
import Report from '../assets/images/Report.svg'
import Like from '../assets/images/Like.svg'
import Liked from '../assets/images/Liked.svg'
import PrevArrow from '../assets/images/PrevArrow.svg'
import NextArrow from '../assets/images/NextArrow.svg'
import axios from 'axios'
import { ENDPOINTS } from '../api/endpoints'
import { CommentInput } from './CommentInput'
import { CommentItem } from './CommentItem'

export const ConcernContent: React.FC = () => {
  const { concern, setConcern, toggleConcernLike, concerns } = useUnifiedConcernStore()
  const { comments } = useCommentStore()
  const { fetchAiAnswer } = useBoardDetailStore()
  const getTotalCommentCount = (list: Comment[] = []): number =>
    list.reduce((acc, c) => acc + 1 + getTotalCommentCount(c.replies ?? []), 0)
  const totalCommentCount = getTotalCommentCount(comments)

  const { pageNumber } = useParams()
  const boardId = pageNumber
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

  // fetchAiAnswer는 fetchBoardDetail에서 자동으로 호출되므로 제거

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
      <img
        src={PrevArrow}
        alt="이전 고민"
        onClick={goToPrev}
        className="cursor-pointer"
      />
      <div className="text-darkWalnut font-mainFont mx-2 bg-mainWhite h-auto w-4/5 rounded-[40px] p-[50px] pb-[32px] my-24 shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
        <p className="text-[30px]">{title}</p>
        <div className="flex items-center my-[20px]">
          <img
            src={profileImg}
            alt="프로필이미지"
            className="w-[30px] h-[30px] rounded-[50%] mr-[12px]"
          />
          <p className="text-[16px]">{nickname}</p>
        </div>
        <p className="whitespace-pre-line break-words font-gothicFont text-[18px] leading-tight">
          {content}
        </p>
        <div className="flex mt-[60px] justify-between">
          <div className="flex items-center">
            <img src={CommentIcon} alt="댓글아이콘" className="h-[24px]" />
            <p className="mt-[2px] ml-[4px] mr-[20px] text-[20px]">
              {totalCommentCount}
            </p>
            <img
              src={Report}
              alt="신고"
              className="mr-[16px] cursor-pointer h-[25px]"
            />
            <div onClick={toggleConcernLike}>
              <img
                src={concern?.like ? Liked : Like}
                className="cursor-pointer h-[25px]"
              />
            </div>
          </div>
          <p>{createdAt}</p>
        </div>
      </div>
      <img
        src={NextArrow}
        alt="다음 고민"
        onClick={goToNext}
        className="cursor-pointer"
      />
    </div>
  )
}

export const ConcernAnswer: React.FC = () => {
  const { boardDetail } = useBoardDetailStore()
  return (
    <div className="text-darkWalnut font-mainFont bg-mainWhite h-auto w-4/5 rounded-[40px] p-[50px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
      <p className="text-[30px] mb-[20px]">달토끼 답변</p>
      <p className="whitespace-pre-line break-words font-gothicFont text-[18px] leading-tight">
        {boardDetail?.aiAnswer || 'AI 답변을 불러오는 중입니다...'}
      </p>
    </div>
  )
}

export const ConcernPost: React.FC = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>()
  const boardId = pageNumber
  const { comments, setComments } = useCommentStore()

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(
          ENDPOINTS.COMMENT_LIST(Number(boardId)),
        )
        const answers = await response.data
        console.log(answers)
        setComments(answers)
      } catch (error) {
        console.error('댓글 조회 실패', error)
      }
    }
    getComments()
  }, [boardId, setComments])

  const getTotalCommentCount = (list: Comment[] = []): number =>
    list.reduce((acc, c) => acc + 1 + getTotalCommentCount(c.replies ?? []), 0)
  const totalCommentCount = getTotalCommentCount(comments)

  return (
    <div className="text-darkWalnut font-mainFont bg-mainWhite h-auto w-4/5 rounded-[40px] my-[50px] p-[50px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
      <div className="flex items-center mb-[20px]">
        <p className="text-[30px] mr-[16px]">댓글</p>
        <img src={CommentIcon} alt="댓글아이콘" />
        <p className="mt-[2px] ml-[4px] text-[20px]">{totalCommentCount}</p>
      </div>
      <CommentInput />
      <div className="mt-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
