import React from 'react';
import { useConcernDetailStore } from '../stores/useConcernDetailStore';
import { useCommentStore } from '../stores/useCommentStore';
import Comment from "../assets/images/Comment.svg";
import Report from '../assets/images/Report.svg';
import Like from "../assets/images/Like.svg";
import Liked from "../assets/images/Liked.svg";
import PrevArrow from "../assets/images/PrevArrow.svg"
import NextArrow from "../assets/images/NextArrow.svg"
import { useParams } from 'react-router-dom';

interface ConcernContentProps {
  title: string;
  content: string;
  category: string;
  date: string;
}

export const ConcernContent: React.FC<ConcernContentProps> = ({
  title,
  content,
  category,
  date
}) => {
  const { concern, toggleConcernLike } = useConcernDetailStore()
  const { comments } = useCommentStore()
  const getTotalCommentCount = (list: typeof comments): number =>
    list.reduce((acc, c) => acc + 1 + getTotalCommentCount(c.replies), 0)
  const totalCommentCount = getTotalCommentCount(comments)
  
  return (
    <div className='flex items-center justify-center w-full'>
      <img src={PrevArrow} alt='이전 고민' />
      <div className='text-darkWalnut font-mainFont mx-2 bg-mainWhite h-auto w-4/5 rounded-[40px] p-[50px] pb-[32px] my-24 shadow-[0_2px_4px_rgba(0,0,0,0.25)]'>
        <p className='text-[30px]'>{title}</p>
        <div className='flex items-center my-[20px]'>
          <img src="images/MoonRabbitLogo.png" alt='프로필이미지' className='w-[30px] h-[30px] rounded-[50%] mr-[12px]' />
          <p className='text-[16px]'>달토끼</p>
        </div>
        <p className='whitespace-pre-line break-words font-gothicFont text-[18px] leading-tight'>{content}</p>
        <div className='flex mt-[60px] justify-between'>
          <div className='flex items-center'>
            <img src={Comment} alt='댓글아이콘' className='h-[24px]' />
            <p className='mt-[2px] ml-[4px] mr-[20px] text-[20px]'>{totalCommentCount}</p>
            <img src={Report} alt='신고' className='mr-[16px] cursor-pointer h-[25px]' />
            <div onClick={toggleConcernLike}>
              <img src={concern?.like ? Liked : Like} className='cursor-pointer h-[25px]'  />
            </div>
          </div>
          <p>{date}</p>
        </div>
      </div>
      <img src={NextArrow} alt='다음 고민' />
    </div>
  )
}

interface Answer {
  userId: number;
  boardId: number;
  content: string;
  createdAt: string;
}

interface ConcernAnswerProps {
  answers: Answer[];
}

export const ConcernAnswer: React.FC<ConcernAnswerProps> = ({ answers }) => {
  return(
    <div className='text-darkWalnut font-mainFont bg-mainWhite h-auto w-4/5 rounded-[40px] p-[50px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]'>
      <p className='text-[30px] mb-[20px]'>달토끼 답변</p>
      {answers.length > 0 ? (
        <p className='whitespace-pre-line break-words font-gothicFont text-[18px] leading-tight'>{answers[0].content}</p>
      ) : (
        <p className='whitespace-pre-line break-words font-gothicFont text-[18px] leading-tight'>아직 답변이 없어요. 첫 답변을 남겨보세요!</p>
      )}
    </div>
  )
}