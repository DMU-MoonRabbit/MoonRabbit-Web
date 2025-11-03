import React, { useEffect, useState } from 'react'

import axios from '@/api/axios'
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
    <section className="w-full max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 my-20">
      <h2 className="text-2xl md:text-4xl text-center text-mainColor font-mainFont md:mt-24 mb-2">
        달토끼 서비스 소개
      </h2>

      <div
        className="
          relative w-full mt-6 md:mt-12
          max-h-[560px]
          rounded-[20px] border-[3px] sm:border-[4px] md:border-[5px]
          border-solid border-mainColor
          bg-mainWhite
          bg-[url('assets/images/MoonRabbitStar.png')]
            bg-no-repeat bg-center
          overflow-hidden
          flex flex-col lg:flex-row items-center justify-center lg:justify-between
          gap-6 lg:gap-8
          px-4 sm:px-6 md:px-8
          py-8 sm:py-10 md:py-14
          min-h-[360px] sm:min-h-[380px] md:min-h-[420px]
        "
      >
        {/* 텍스트 */}
        <p className="font-gothicFont ml-0 xl:ml-8 leading-relaxed tracking-tight text-mainBlack text-sm sm:text-base md:text-base lg:text-lg xl:text-2xl lg:text-left max-w-[680px] lg:max-w-[50%] lg:order-1">
          <span className="block text-mainColor">
            달토끼는 서로의 마음을 조용히 안아주는 고민 상담 커뮤니티예요.
          </span>
          <span className="block text-mainColor">
            작은 걱정도, 깊이 숨겨둔 고민도 이곳에 살짝 내려놓아도 괜찮아요.
          </span>
          <span className="block text-mainBlack mt-4">
            달빛 아래에서는 어떤 마음이든 가벼워질 수 있으니까요.
          </span>
          <span className="block text-mainColor mt-4">
            혼자 끌어안고 있던 마음을 밤하늘에 띄워보세요.
          </span>
          <span className="block text-mainColor">
            AI 상담사 달토끼가 고민을 듣고, 바로 답을 해드릴게요.
          </span>
          <span className="block text-mainBlack mt-4">
            어떤 이야기든 괜찮아요. 달토끼는 언제나 그대 곁에서 귀 기울이고 있을게요.
          </span>
        </p>

        {/* 이미지 */}
        <img
          src="/images/MoonRabbitWakeUp.png"
          alt="달토끼 로고"
          className="w-[55%] max-w-[260px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[520px] object-contain lg:order-2"
        />
      </div>
    </section>
  )
}

export default ServiceIntro
