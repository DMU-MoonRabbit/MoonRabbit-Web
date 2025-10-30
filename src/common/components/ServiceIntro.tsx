import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ENDPOINTS } from '@/api/endpoints'

const ServiceIntro: React.FC = () => {
  const [totalBoards, setTotalBoards] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const extractTotal = (data: any): number | null => {
    if (typeof data === 'number') return data
    if (typeof data?.count === 'number') return data.count
    if (typeof data?.total === 'number') return data.total
    if (typeof data?.totalCount === 'number') return data.totalCount
    if (typeof data?.totalElements === 'number') return data.totalElements
    if (typeof data?.data?.total === 'number') return data.data.total
    if (typeof data?.data?.count === 'number') return data.data.count
    return null
  }

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        setLoading(true)
        const res = await axios.get(ENDPOINTS.TOTAL_BOARD_COUNT, {
          withCredentials: true,
        })
        const parsed = extractTotal(res.data)
        setTotalBoards(parsed !== null ? parsed : null)
      } catch {
        setTotalBoards(null)
      } finally {
        setLoading(false)
      }
    }
    fetchTotal()
  }, [])

  return (
    <section className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
      <h2 className="text-2xl md:text-4xl text-center text-mainColor font-mainFont mt-12 md:mt-30 mb-2">
        달토끼 서비스 소개
      </h2>
      {/* 총 게시글 수 배지 */}
      <p className="text-center text-lightWalnut font-mainFont mb-6 text-sm md:text-base">
        {loading
          ? '총 게시글 수 로딩 중...'
          : totalBoards !== null
          ? `지금까지 ${totalBoards.toLocaleString()}개의 고민이 밤하늘에 올려졌어요`
          : '총 게시글 수를 불러오지 못했어요'}
      </p>

      <div
        className="
          relative w-full mt-8 md:mt-16
          max-h-[720px]
          rounded-[20px] border-[3px] sm:border-[4px] md:border-[5px]
          border-solid border-mainColor
          bg-mainWhite
          bg-[url('assets/images/MoonRabbitStar.png')]
            bg-no-repeat bg-center
          overflow-hidden
          flex flex-col lg:flex-row items-center justify-center lg:justify-between
          gap-8 lg:gap-12
          px-6 sm:px-8 md:px-12
          py-10 sm:py-14 md:py-20
          min-h-[420px] sm:min-h-[420px] md:min-h-[500px]
        "
      >
        {/* 텍스트 */}
        <p className="font-gothicFont ml-0 xl:ml-10 leading-relaxed tracking-tight text-mainBlack text-sm sm:text-base md:text-lg lg:text-xl xl:text-3xl lg:text-left max-w-[720px] lg:max-w-[50%] lg:order-1">
          <span className="block text-mainColor">
            달토끼는 서로의 마음을 조용히 안아주는 고민 상담 커뮤니티예요.
          </span>
          <span className="block text-mainColor">
            작은 걱정도, 깊이 숨겨둔 고민도 이곳에 살짝 내려놓아도 괜찮아요.
          </span>
          <span className="block text-mainBlack mt-6">
            달빛 아래에서는 어떤 마음이든 가벼워질 수 있으니까요.
          </span>
          <span className="block text-mainColor mt-6">
            혼자 끌어안고 있던 마음을 밤하늘에 띄워보세요.
          </span>
          <span className="block text-mainColor">
            달토끼가 조용히 듣고, 따뜻하게 위로할게요.
          </span>
        </p>

        {/* 이미지 */}
        <img
          src="/images/MoonRabbitWakeUp.png"
          alt="달토끼 로고"
          className="w-[60%] max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[569px] object-contain lg:order-2"
        />
      </div>
    </section>
  )
}

export default ServiceIntro
