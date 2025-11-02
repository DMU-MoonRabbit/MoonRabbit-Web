import React from 'react'

import ClickLike from '@/assets/images/ClickingLike.png'
import CommentWriting from '@/assets/images/CommentWriting.png'
import NightSkyDrawing from '@/assets/images/NightSkyDrawing.png'
import LevelUp from '@/assets/images/PointuseLevel.png'
import ItemPurchase from '@/assets/images/PointuseShop.png'

import PointCard from './PointCard'
import PointUsingCard from './PointUsingCard'

const TrustSection: React.FC = () => {
  return (
    <section className="relative w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 mb-20 md:my-20">
      <div className="w-full">
        <div>
          <div className="text-right mb-8">
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
        <div className="mt-20 md:mt-40">
          <div className="mb-12 text-left">
            <h3 className="text-2xl md:text-4xl text-mainColor font-mainFont mb-2">
              포인트로 프로필을 꾸며보세요
            </h3>
            <p className="text-base sm:text-lg text-lightWalnut font-mainFont">
              포인트로 프로필을 꾸밀 수 있는 아이템들을 구매할 수 있어요
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 w-full">
            <PointUsingCard
              title="레벨 업!"
              imageUrl={LevelUp}
              description="신뢰도가 쌓이면 자동으로 레벨이 올라가고 레벨업을 통해 별 배지를 얻을 수 있어요"
            />
            <PointUsingCard
              title="아이템 구매"
              imageUrl={ItemPurchase}
              description="상점에서 배너, 테두리, 닉네임 색상을 구매하고 마이페이지에서 장착할 수 있어요"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection
