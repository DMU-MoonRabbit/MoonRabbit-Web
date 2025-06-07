import React from 'react'
import axios from 'axios'
import { useCommentStore } from '../stores/useCommentStore'
import { useParams } from 'react-router-dom'

interface CommentInputProps {
  parentId?: number | null
}

export const CommentInput: React.FC<CommentInputProps> = ({ parentId = null }) => {
  const { pageNumber } = useParams<{ pageNumber: string }>() // 추후 App.ts에서 boardId로 수정
  const boardId = pageNumber
  const {
    commentContent,
    setCommentContent,
    replyContents,
    setReplyContent,
  } = useCommentStore()

  const value = parentId !== null ? replyContents[parentId] || '' : commentContent

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    parentId !== null
      ? setReplyContent(parentId, val)
      : setCommentContent(val)
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) return

    const content = value.trim()
    if (!content) return

    try {
      const response = await axios.post(`http://moonrabbit-api.kro.kr/api/answer/save?boardId=${boardId}`,
        {
          content,
          parentId: parentId ?? null,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const newComment = response.data
      useCommentStore.getState().addComment(newComment, parentId)
      console.log(newComment)

      // 입력창 초기화
      parentId !== null
        ? setReplyContent(parentId, '')
        : setCommentContent('')
    } catch (err) {
      console.error('댓글 등록 실패', err)
    }
  }

  return (
    <div className="border-2 border-darkWalnut p-[12px] mt-2">
      <textarea
        className="font-gothicFont appearance-none border-none outline-none resize-none bg-transparent p-0 m-0 shadow-none focus:ring-0 focus:outline-none w-full"
        rows={4}
        value={value}
        onChange={onChange}
      />
      <div 
        className='cursor-pointer flex justify-self-end bg-mainColor text-mainWhite w-fit p-[4px] px-[10px] rounded-[10px] text-[16px] mt-[12px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]'
        onClick={handleSubmit}
      >
        등록
      </div>
    </div>
  )
}