import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useCommentStore } from '../stores/useCommentStore'
import { CommentInput } from './CommentInput'
import { CommentItem } from './CommentItem'
import Comment from "../assets/images/Comment.svg";

export const ConcernComment: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>()
  const { comments, setComments } = useCommentStore()

  // 유저 정보  get
  const getUserInfo = async (userId: number) => {
    try {
      const response = await axios.get(`http://moonrabbit-api.kro.kr/api/users/${userId}`)
      const authorData = await response.data
      return {
        nickname: authorData.nickname,
        profileImage: authorData.profileImageUrl,
      }
    } catch (err) {
      console.error('댓글 작성자 조회 실패:', err)
    }
  }

  // useEffect(() => {
  //   const getComments = async () => {
  //     try {
  //       const response = await axios.get(`http://moonrabbit-api.kro.kr/api/boards/list/${boardId}`)
  //       const data = await response.data
  //       const answers = await Promise.all(
  //       data.answers.map(async (ans: any, index: number) => {
  //         const author = await getUserInfo(ans.userId)
  //         return {
  //           id: index + 1,
  //           author: author.nickname,
  //           profileImage: author.profileImage,
  //           content: ans.content,
  //           date: ans.createdAt.split('T')[0].replace(/-/g, '.'),
  //           like: false, 
  //           replies: [], 
  //         }
  //       })
  //     )

  //     setComments(answers)
  //     } catch (error) {
  //       console.error('댓글 조회 실패', error)
  //     }
  //   }
  //   getComments()
  // }, [])

  const getTotalCommentCount = (list: Comment[] = []): number =>
    list.reduce(
    (acc, c) => acc + 1 + getTotalCommentCount(c.replies ?? []),
    0
  )
  const totalCommentCount = getTotalCommentCount(comments)

  return (
    <div className="text-darkWalnut font-mainFont bg-mainWhite h-auto w-4/5 rounded-[40px] my-[50px] p-[50px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
      <div className="flex items-center mb-[20px]">
        <p className='text-[30px] mr-[16px]'>댓글</p>
        <img src={Comment} alt='댓글아이콘' />
        <p className='mt-[2px] ml-[4px] text-[20px]'>{totalCommentCount}</p>
      </div>
      <CommentInput />
      <div className="mt-4">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
