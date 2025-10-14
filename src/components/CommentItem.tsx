import React, { useEffect } from 'react'
import { Comment } from '../stores/useCommentStore'
import { useCommentStore } from '../stores/useCommentStore'
import { CommentInput } from './CommentInput'
import { useAuthStore } from '../stores/useAuthStore'
import { usePostAuthorItems } from '../hooks/usePostAuthorItems'
import Like from '../assets/images/likeThick.svg'
import Liked from '../assets/images/likedThick.svg'
import useUserStore from '../stores/useUserStore'
import axios from 'axios'
import { ENDPOINTS } from '../api/endpoints'

interface CommentItemProps {
  comment: Comment
  depth?: number
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  depth = 0,
}) => {
  const {
    toggleCommentLike,
    replyTargetId,
    setReplyTargetId,
    deleteComment,
  } = useCommentStore()
  const { userId, setUserId } = useUserStore()
  const { isLoggedIn } = useAuthStore()
  const showReplyInput = replyTargetId === comment.id

  // API 데이터에서 장착 아이템 정보를 받아오거나, 본인 댓글이면 현재 장착 아이템 사용
  const { borderImageUrl: ownBorderUrl, nicknameColor: ownNicknameColor } = usePostAuthorItems(comment.userId)
  const borderImageUrl = comment.borderImageUrl || ownBorderUrl
  const nicknameColor = comment.nicknameColor || ownNicknameColor

  useEffect(() => {
    if( isLoggedIn ) {
      const token = localStorage.getItem('accessToken')
      const getUserId = async () => {
      try {
        const response = await axios.get(
          ENDPOINTS.COMMENT_LIST(comment.id),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setUserId(response.data.id)
      } catch (error) {
        console.error('유저아이디 실패', error)
      }
    }
    getUserId()
    }
  }, [comment.id, isLoggedIn, setUserId])

  return (
    <div className="mt-12">
      <div className="flex items-center">
        {/* 프로필 이미지 + 테두리 */}
        <div className="relative w-[30px] h-[30px] md:w-[50px] md:h-[50px] mr-[8px]">
          <img
            src={comment.profileImg?.trim() || '/images/MoonRabbitSleep2.png'}
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/images/MoonRabbitSleep2.png'
            }}
          />
          {/* 장착된 테두리 - 본인 댓글일 때만 표시 */}
          {borderImageUrl && (
            <img
              src={borderImageUrl}
              alt="프로필 테두리"
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />
          )}
        </div>
        <p 
          className="text:[16px] md:text-[18px]"
          style={nicknameColor ? { color: nicknameColor } : {}}
        >
          {comment.nickname}
        </p>
      </div>
      <p className="whitespace-pre-line break-words font-gothicFont text-[16px] md:text-[18px] md:leading-tight my-4">
        {comment.content}
      </p>
      <div className="flex text-[14px] md:text-[16px] items-center">
        <p className="mr-4">
          {comment.createdAt.split('T')[0].replace(/-/g, '.')}
        </p>
        {depth === 0 && (
          <div
            className="mr-4 cursor-pointer text-[14px] md:text-[16px]"
            onClick={() =>
              setReplyTargetId(replyTargetId === comment.id ? null : comment.id)
            }
          >
            {replyTargetId === comment.id ? '닫기' : '답글쓰기'}
          </div>
        )}
        {userId === comment.userId && (
          <div
            className="mr-4 text-mainColor cursor-pointer"
            onClick={() => deleteComment(comment.id)}
          >
            삭제하기
          </div>
        )}
        <div onClick={() => toggleCommentLike(comment.id)} className="mr-2">
          <img
            src={comment.like ? Liked : Like}
            alt="좋아요아이콘"
            className="cursor-pointer"
          />
        </div>
        <div>{comment.likeCount}</div>
      </div>
      {/* 답글Input */}
      {showReplyInput && (
        <div className="ml-6 mt-4">
          <CommentInput parentId={comment.id} />
        </div>
      )}
      {/* 답글 렌더링 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-6 mt-2">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
