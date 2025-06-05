import React from 'react';
import { useResponsiveStore } from '../stores/useResponsiveStore';
import { useConcernDetailStore } from '../stores/useConcernDetailStore';
import Comment from "../assets/images/Comment.svg";
import Report from '../assets/images/Report.svg';
import Like from "../assets/images/Like.svg";
import Liked from "../assets/images/Liked.svg";
import PrevArrow from "../assets/images/PrevArrow.svg"
import NextArrow from "../assets/images/NextArrow.svg"
import { useParams } from 'react-router-dom';


function getTotalCommentCount(comments: Comment[]): number {
  let count = 0
  for (const comment of comments) {
    count += 1
    if (comment.replies && comment.replies.length > 0) {
      count += getTotalCommentCount(comment.replies)
    }
  }
  return count
}

export const ConcernContent: React.FC = () => {
  const res = useResponsiveStore((state) => state.res)
  const { concern, comments, toggleConcernLike } = useConcernDetailStore()
  const totalCommentCount = getTotalCommentCount(comments)
  return (
    <div className='flex items-center justify-center w-full'>
      <img src={PrevArrow} alt='이전 고민' />
      <div className='text-darkWalnut font-mainFont mx-2 bg-mainWhite h-auto w-4/5 rounded-[40px] p-[50px] pb-[32px] my-24 shadow-[0_2px_4px_rgba(0,0,0,0.25)]'>
        <p className='text-[30px]'>{concern?.title}</p>
        <div className='flex items-center my-[20px]'>
          <img src={concern?.profileImage} alt='프로필이미지' className='w-[30px] h-[30px] rounded-[50%] mr-[12px]' />
          <p className='text-[16px]'>{concern?.nickname}</p>
        </div>
        <p className='whitespace-pre-line break-words font-gothicFont text-[18px] leading-tight'>{concern?.content}</p>
        <div className='flex mt-[60px] justify-between'>
          <div className='flex items-center'>
            <img src={Comment} alt='댓글아이콘' className='h-[24px]' />
            <p className='mt-[2px] ml-[4px] mr-[20px] text-[20px]'>{totalCommentCount}</p>
            <img src={Report} alt='신고' className='mr-[16px] cursor-pointer h-[25px]' />
            <div onClick={toggleConcernLike}>
              <img src={concern?.like ? Liked : Like} className='cursor-pointer h-[25px]'  />
            </div>
          </div>
          <p>{concern?.date}</p>
        </div>
      </div>
      <img src={NextArrow} alt='다음 고민' />
    </div>
  )
}

export const ConcernAnswer: React.FC = () => {
  const { concern } = useConcernDetailStore()
  return(
    <div className='text-darkWalnut font-mainFont bg-mainWhite h-auto w-4/5 rounded-[40px] p-[50px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]'>
      <p className='text-[30px] mb-[20px]'>달토끼 답변</p>
      <p className='whitespace-pre-line break-words font-gothicFont text-[18px] leading-tight'>{concern?.answer}</p>
    </div>
  )
}

export const ConcernComment: React.FC = () => {
  const { comments } = useConcernDetailStore()
  const totalCommentCount = getTotalCommentCount(comments)
  return(
    <div className='text-darkWalnut font-mainFont bg-mainWhite h-auto w-4/5 rounded-[40px] my-[50px] p-[50px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]'>
      <div className='flex items-center'>
        <p className='text-[30px] mb-[20px] mr-[16px]'>댓글</p>
        <img src={Comment} alt='댓글아이콘' className='mb-[16px]' />
        <p className='mb-[14px] ml-[4px] text-[20px]'>{totalCommentCount}</p>
      </div>
      <CommentTextField />
      <CommentContent comments={comments} />
    </div>
  )
}

interface CommentContentProps {
  comments: Comment[]
  depth?: number
}
export const CommentContent: React.FC<CommentContentProps> = ({ comments, depth = 0 }) => {
  const { toggleCommentLike, replyTargetId, setReplyTargetId } = useConcernDetailStore()
  
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} className='mt-12'>
          <div className='flex items-center'>
            <img src={comment.profileImage} alt={`${comment.author} 프로필`} className='w-[50px] h-[50px] rounded-[50%] mr-[8px]' />
            <p className='text-[18px]'>{comment.author}</p>
          </div>
          <p className='whitespace-pre-line break-words font-gothicFont text-[18px] leading-tight my-4'>{comment.content}</p>
          <div className='flex text-[16px]'>
            <p className='mr-4'>{comment.date}</p>
            {/* 댓글일 경우에만 답글쓰기 보이기 */}
            {depth === 0 && 
            <div
              className='mr-4 cursor-pointer'
              onClick={() =>
                  setReplyTargetId(replyTargetId === comment.id ? null : comment.id)
                }
              >
                {replyTargetId === comment.id ? '닫기' : '답글쓰기'}</div>
            }
            <div onClick={() => toggleCommentLike(comment.id)}>
              <img src={comment.like ? Liked : Like} alt="좋아요아이콘" className='cursor-pointer' />
            </div>
          </div>
          {replyTargetId === comment.id && (
            <div className='ml-16 mt-2'>
              <CommentTextField isReply={true} targetId={comment.id} />
            </div>
          )}
          {/* 대댓글이 있을 때 */}
          {comment.replies.length > 0 && (
            <div className='ml-16 mt-2'>
              <CommentContent comments={comment.replies} depth={depth + 1} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}


interface CommentTextFieldProps {
  isReply?: boolean
  targetId?: number | null
}
export const CommentTextField: React.FC<CommentTextFieldProps> = ({ isReply = false, targetId = null }) => {
  const { 
    commentContent,
    setCommentContent,
    replyContents,
    setReplyContent, } = useConcernDetailStore()
  
  const value = isReply && targetId !== null ? replyContents[targetId] || '' : commentContent
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isReply && targetId !== null) {
      setReplyContent(targetId, e.target.value)
    } else {
      setCommentContent(e.target.value)
    }
  }

  const handleSubmit = () => {

  }


  return(
    <div className='border-3 border-darkWalnut p-[12px]'>
      <textarea 
        value={value}
        onChange={onChange}
        className='font-gothicFont appearance-none border-none outline-none resize-none bg-transparent p-0 m-0 shadow-none focus:ring-0 focus:outline-none w-full'
        rows={4}
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