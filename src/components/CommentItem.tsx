import React, { useEffect } from 'react'
import { Comment } from '../stores/useCommentStore'
import { useCommentStore } from '../stores/useCommentStore'
import { CommentInput } from './CommentInput'
import { useAuthStore } from '../stores/useAuthStore'
import Like from '../assets/images/Like.svg'
import Liked from '../assets/images/Liked.svg'
import useUserStore from '../stores/useUserStore'
import axios from 'axios'

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

  useEffect(() => {
    if( isLoggedIn ) {
      const token = localStorage.getItem('accessToken')
      const getUserId = async () => {
      try {
        const response = await axios.get(
          `https://moonrabbit-api.kro.kr/api/users/profile`, {
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
  },[])

  return (
    <div className="mt-12">
      <div className="flex items-center">
        <img
          src={comment.profileImg}
          className="w-[50px] h-[50px] rounded-[50%] mr-[8px]"
        />
        <p className="text-[18px]">{comment.nickname}</p>
      </div>
      <p className="whitespace-pre-line break-words font-gothicFont text-[18px] leading-tight my-4">
        {comment.content}
      </p>
      <div className="flex text-[16px]">
        <p className="mr-4">
          {comment.createdAt.split('T')[0].replace(/-/g, '.')}
        </p>
        {depth === 0 && (
          <div
            className="mr-4 cursor-pointer"
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
        <div className="ml-12">
          <CommentInput parentId={comment.id} />
        </div>
      )}
      {/* 답글 렌더링 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-12 mt-2">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
