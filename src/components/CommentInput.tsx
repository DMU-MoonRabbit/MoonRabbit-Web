import React from 'react'
import { useCommentStore } from '../stores/useCommentStore'

interface CommentInputProps {
  parentId?: number | null
}

export const CommentInput: React.FC<CommentInputProps> = ({ parentId = null }) => {
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

  const handleSubmit = () => {
    
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
        className='flex justify-self-end bg-mainColor text-mainWhite w-fit p-[4px] px-[10px] rounded-[10px] text-[16px] mt-[12px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]'
        onClick={handleSubmit}
      >
        등록
      </div>
    </div>
  )
}