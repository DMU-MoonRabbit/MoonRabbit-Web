import React from "react"

const MypageSidebar: React.FC = () => {
  
  return (
    <div className="w-[500px] bg-darkWalnut px-4 flex flex-col justify-center gap-4">
      <div className="font-mainFont text-white text-[2vw]">
        레벨
        <span className="ml-[1vw]">
          22
        </span>
      </div>
      <div className="h-12 bg-white">별영역</div>
      <button className='flex items-center justify-center rounded-xl bg-mainColor text-white font-mainFont w-full text-[1.5vw] py-2 mr-8'>
        내 밤하늘
      </button>
      <button className='flex items-center justify-center rounded-xl bg-mainColor text-white font-mainFont w-full text-[1.5vw] py-2 mr-8'>
        내 별자리
      </button>
    </div>
  )
}

export default MypageSidebar