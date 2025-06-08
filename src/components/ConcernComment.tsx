import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useCommentStore } from '../stores/useCommentStore'
import { CommentInput } from './CommentInput'
import { CommentItem } from './CommentItem'
import Comment from '../assets/images/Comment.svg'

export const ConcernComment: React.FC = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>()
  const boardId = pageNumber
  const { comments, setComments } = useCommentStore()

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(
          `http://moonrabbit-api.kro.kr/api/answer/board/${boardId}`,
        )
        const answers = await response.data
        console.log(answers)
        setComments(answers)
      } catch (error) {
        console.error('댓글 조회 실패', error)
      }
    }
    getComments()
  }, [])

  const getTotalCommentCount = (list: Comment[] = []): number =>
    list.reduce((acc, c) => acc + 1 + getTotalCommentCount(c.replies ?? []), 0)
  const totalCommentCount = getTotalCommentCount(comments)

  return (
    <div className="text-darkWalnut font-mainFont bg-mainWhite h-auto w-4/5 rounded-[40px] my-[50px] p-[50px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
      <div className="flex items-center mb-[20px]">
        <p className="text-[30px] mr-[16px]">댓글</p>
        <img src={Comment} alt="댓글아이콘" />
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
