import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ENDPOINTS } from '../api/endpoints'
import { useCommentStore, Comment } from '../stores/useCommentStore'
import { CommentInput } from './CommentInput'
import { CommentItem } from './CommentItem'
import CommentIcon from '../assets/images/Comment.svg'
import { useResponsiveStore } from '../stores/useResponsiveStore'
import clsx from 'clsx'

export const ConcernComment: React.FC = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>()
  const boardId = pageNumber ? parseInt(pageNumber, 10) : undefined
  const { comments, setComments } = useCommentStore()

  useEffect(() => {
    const getComments = async () => {
      if (!boardId) {
        console.error('boardId is undefined')
        return
      }
      
      try {
        const token = localStorage.getItem('accessToken')
        const headers: Record<string, string> = {}
        
        // 로그인 상태라면 토큰 포함 (좋아요 상태 확인을 위해)
        if (token) {
          headers['Authorization'] = `Bearer ${token}`
        }
        
        const response = await axios.get(
          ENDPOINTS.COMMENT_LIST(boardId),
          {
            headers,
            withCredentials: true
          }
        )
        const answers = await response.data
        console.log('📋 댓글 목록 조회:', answers)
        
        // likedByMe 상태 확인 로그
        if (answers && answers.length > 0) {
          console.log('💗 댓글 좋아요 상태:', answers.map((a: any) => ({
            id: a.id,
            likedByMe: a.likedByMe,
            likeCount: a.likeCount
          })))
        }
        
        setComments(answers)
      } catch (error) {
        console.error('댓글 조회 실패', error)
        
        // 토큰 에러 시 토큰 없이 재시도
        if (axios.isAxiosError(error)) {
          const errorCode = error.response?.data?.code
          const status = error.response?.status
          
          if (status === 401 || status === 403 || errorCode === 'U002') {
            console.warn('토큰이 유효하지 않습니다. 비로그인 상태로 댓글을 조회합니다.')
            
            // 유효하지 않은 토큰 제거
            if (errorCode === 'U002') {
              localStorage.removeItem('accessToken')
            }
            
            // 토큰 없이 재시도
            try {
              const response = await axios.get(
                ENDPOINTS.COMMENT_LIST(boardId),
                {
                  withCredentials: true
                }
              )
              const answers = await response.data
              setComments(answers)
            } catch (retryError) {
              console.error('토큰 없이 댓글 조회 재시도 실패:', retryError)
            }
          }
        }
      }
    }
    getComments()
  }, [boardId, setComments])

  const getTotalCommentCount = (list: Comment[] = []): number =>
    list.reduce((acc, c) => acc + 1 + getTotalCommentCount(c.replies ?? []), 0)
  const totalCommentCount = getTotalCommentCount(comments)

  const { res } = useResponsiveStore()
  const isMobile = res === 'mo'

  return (
    <div className={clsx("text-darkWalnut font-mainFont bg-mainWhite h-auto rounded-[40px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]",
      isMobile ? "w-[calc(100%-2rem)] mx-auto p-8 my-12" : "w-4/5 p-[50px] my-24"
    )}>
      <div className="flex items-center mb-[20px]">
        <p className="text-[24px] md:text-[30px] mr-[16px]">댓글</p>
        <img src={CommentIcon} alt="댓글아이콘" />
        <p className="mt-[2px] ml-[4px] text-[20px]">{totalCommentCount}</p>
      </div>
      <CommentInput />
      <>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </>
    </div>
  )
}
