import React from "react"
import { X } from "lucide-react"
import { useResponsiveStore } from "../stores/useResponsiveStore"
import clsx from 'clsx'

interface CenteredPopupProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  widthClassName?: string
}

const CenteredPopup: React.FC<CenteredPopupProps> = ({
  title,
  isOpen,
  onClose,
  children,
  widthClassName = "w-[80vw] max-w-[1200px]",
}) => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className={`relative z-10 bg-white rounded-2xl shadow-xl p-6 ${widthClassName} max-h-[80vh] overflow-auto hide-scrollbar`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex">
            <img
              src="/images/MoonRabbitSleep2.png"
              alt="logo"
              className="w-18 mr-5 inline"
            />
            <div className="flex flex-col items-center font-mainFont text-darkWalnut -ml-2 mt-auto">
              <span className="text-[24px] lg:text-[30px]">
                <span className="text-lightCaramel">달</span>토끼
              </span>
              <span className="text-[12px] lg:text-[12px] leading-[0.6]">
                <span className="text-lightCaramel">Moon</span>Rabbit
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-darkWalnut">
            <X size={24} className="w-6 h-6" />
          </button>
        </div>
        <div className={clsx("font-mainFont text-darkWalnut",
          isMobile ?
          "mt-8 mb-4 text-[16px]" : "mt-16 mb-4 text-[24px]"
        )}>
          {title}
        </div>
        <div className="text-darkWalnut font-gothicFont">
          {children}
        </div>
      </div>
    </div>
  )
}

export default CenteredPopup
