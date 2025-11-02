import React from 'react'
import ClickLike from '@/assets/images/ClickingLike.png'
import CommentWriting from '@/assets/images/CommentWriting.png'
import NightSkyDrawing from '@/assets/images/NightSkyDrawing.png'
import PointCard from './PointCard'

const TrustSection: React.FC = () => {
  return (
    <section className="relative w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 mb-20 md:my-20">
      <div className="w-full">
        <div>
          <div className="text-left mb-8">
            <h3 className="text-2xl md:text-4xl text-mainColor font-mainFont mb-2">
              신뢰도를 쌓아 포인트를 얻어요
            </h3>
            <p className="text-base sm:text-lg text-lightWalnut font-mainFont">
              고민을 함께 나누며 신뢰도를 쌓으면 포인트를 얻을 수 있어요!
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 w-full">
            <PointCard
              title="밤하늘 그리기"
              imageUrl={NightSkyDrawing}
              description="모두와 고민을 공유하기만 해도 포인트를 얻을 수 있어요"
            />
            <PointCard
              title="댓글 달기"
              imageUrl={CommentWriting}
              description="다른 사람의 고민에 공감과 위로의 답변을 달아요"
            />
            <PointCard
              title="좋아요 받기"
              imageUrl={ClickLike}
              description="내 댓글에 좋아요가 달리면 포인트가 올라요"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection
