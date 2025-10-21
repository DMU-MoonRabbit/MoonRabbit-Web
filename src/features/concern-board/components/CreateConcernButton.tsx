import React from 'react'
import { PenBox } from 'lucide-react'
import { useResponsiveStore } from '../../../common/hooks/useResponsiveStore'

interface CreateConcernButtonProps {
  onClick: () => void
}

const CreateConcernButton: React.FC<CreateConcernButtonProps> = ({
  onClick,
}) => {
  const { res } = useResponsiveStore()

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center rounded-lg bg-mainColor text-white font-mainFont ${
        res === 'pc'
          ? 'w-[188px] h-[48px] text-[18px] mr-8'
          : 'w-[220px] h-[40px] text-[12px]'
      }`}
    >
      <PenBox size={res === 'pc' ? 24 : 20} className="mr-2" />
      <span className={res !== 'pc' ? 'leading-tight' : ''}>
        {res !== 'pc' ? (
          <>
            밤하늘 <br /> 그리기
          </>
        ) : (
          '밤하늘 그리기'
        )}
      </span>
    </button>
  )
}

export default CreateConcernButton
