import React from 'react'
import { useResponsiveStore } from '@/common/hooks/useResponsiveStore'
import clsx from 'clsx'

interface ConcernCardProps {
  id: number
  profileImage: string
  title: string
  category: string
  content: string
  recentComment: {
    author: string
    text: string
  }
  date?: string
  backgroundImage?: string
  onClick?: (id: number) => void
  borderImageUrl?: string  // 작성자의 장착 테두리 (API 또는 본인)
  nicknameColor?: string    // 작성자의 장착 닉네임 색상 (API 또는 본인)
}

const ConcernCard: React.FC<ConcernCardProps> = ({
  id,
  profileImage,
  title,
  category,
  content,
  recentComment,
  date,
  backgroundImage,
  onClick,
  borderImageUrl,
}) => {
  const res = useResponsiveStore((state) => state.res)
  const isMobile = res === 'mo'

  return (
    <div
      className={clsx(
        'w-full relative overflow-hidden mx-auto bg-cover bg-center transition-transform duration-200 animate-float hover:translate-y-[-2px]',
        isMobile
          ? 'min-h-[10rem] sm:min-h-[12rem] md:min-h-[14rem] max-w-full rounded-xl px-2 sm:px-4'
          : 'min-h-[16.25rem] max-w-[35rem] rounded-4xl px-[0.625rem]',
      )}
      style={{
        backgroundImage: `url(${backgroundImage || '/images/ConcernBackground.png'})`,
        boxShadow: 'inset 0 0 0 2px #473C2C',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={() => onClick && onClick(id)}
    >
      <div className={clsx('relative z-10 w-full h-full flex flex-col px-1 sm:px-2', !isMobile && 'px-[0.3125rem]')}>
        {/* 상단 영역 - 프로필, 제목, 카테고리 */}
        <div className="flex-shrink-0">
          {/* 프로필 이미지 + 테두리 */}
          <div
            className={clsx(
              'absolute transition-transform duration-200 bg-lightBackground hover:scale-105',
              isMobile
                ? 'w-12 h-12 sm:w-14 sm:h-14 rounded-full top-3 left-3'
                : 'w-[5rem] h-[5rem] rounded-full top-[1.1875rem] left-[1.875rem]',
            )}
            style={{ aspectRatio: '1 / 1' }}
          >
            <img
              src={profileImage?.trim() || '/images/MoonRabbitSleep2.png'}
              alt="Profile"
              className="absolute inset-0 w-full h-full object-cover rounded-full"
              style={{ aspectRatio: '1 / 1' }}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = '/images/MoonRabbitSleep2.png'
              }}
            />
            {/* 장착된 테두리 이미지 */}
            {borderImageUrl && (
              <img
                src={borderImageUrl}
                alt="테두리"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ aspectRatio: '1 / 1' }}
              />
            )}
          </div>

          {/* 제목 */}
          <h3
            className={clsx(
              'absolute font-mainFont bg-lightBeige text-darkWalnut rounded-full whitespace-nowrap overflow-hidden text-ellipsis',
              isMobile
                ? 'left-16 sm:left-20 top-3 text-sm sm:text-base px-2 sm:px-3 py-1 max-w-[calc(100%-5rem)] sm:max-w-[calc(100%-6rem)]'
                : 'left-[7.5rem] top-[1.5rem] text-[1.2rem] px-4 py-[0.375rem] max-w-[calc(100%-8.5rem)]',
            )}
          >
            {title}
          </h3>

          {/* 카테고리 */}
          <div
            className={clsx(
              'absolute flex flex-wrap gap-1 sm:gap-3',
              isMobile
                ? 'top-10 sm:top-12 left-16 sm:left-20 w-[calc(100%-5rem)] sm:w-[calc(100%-6rem)]'
                : 'top-[4.25rem] left-[7.5rem] max-w-[calc(100%-8.5rem)]',
            )}
          >
            {category.split(',').map((cat, i) => (
              <span
                key={i}
                className={clsx(
                  'inline-block bg-lightBeige text-mainColor font-semibold rounded-full shadow-md transition-transform hover:-translate-y-[1px] flex-shrink-0 whitespace-nowrap',
                  isMobile ? 'text-[0.6rem] sm:text-[0.7rem] px-1 sm:px-1.5 py-0.5 sm:py-1' : 'text-sm px-3 py-1 max-w-[5.75rem]',
                )}
              >
                {cat.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* 중간 영역 - 본문 */}
        <div className={clsx(
          'flex bg-white rounded-xl px-2 sm:px-3 py-1 sm:py-2',
          isMobile
            ? 'mt-16 sm:mt-20 mx-12 sm:mx-16 mr-3 mb-2 sm:mb-3'
            : 'mt-28 ml-[1.875rem] mr-[0.9375rem] max-w-[29.375rem] mb-3',
        )}>
          <p
            className={clsx(
              'text-darkWalnut leading-snug line-clamp-2 h-full flex items-center',
              isMobile ? 'text-xs sm:text-sm' : 'text-base',
            )}
          >
            {content.length > 30 ? `${content.substring(0, 30)}...` : content}
          </p>
          {date && (
            <span
              className={clsx(
                'absolute text-darkWalnut opacity-80 transition-opacity duration-200 hover:opacity-100',
                isMobile
                  ? 'right-2 bottom-1 text-[0.6rem] sm:text-[0.65rem]'
                  : 'right-4 bottom-2 text-[0.7rem]',
              )}
            >
              {date}
            </span>
          )}
        </div>

        {/* 하단 영역 - 댓글 */}
        <div className="flex-shrink-0">
          <div
            className={clsx(
              'bg-lightBeige rounded-lg flex items-center px-2 sm:px-3 py-1',
              isMobile
                ? 'mx-12 sm:mx-16 mr-3 min-h-[1.5rem]'
                : 'ml-[1.875rem] mr-[0.9375rem] max-w-[29.375rem]',
            )}
          >
            <span
              className={clsx(
                'text-mainBlack font-semibold whitespace-nowrap overflow-hidden text-ellipsis mr-1 sm:mr-2 flex-shrink-0',
                isMobile ? 'text-[0.7rem] sm:text-[0.8rem]' : 'text-sm',
              )}
            >
              {recentComment.author}:
            </span>
            <p
              className={clsx(
                'text-mainBlack leading-snug m-0 whitespace-nowrap overflow-hidden text-ellipsis flex-1',
                isMobile ? 'text-[0.7rem] sm:text-[0.8rem]' : 'text-sm',
              )}
            >
              {recentComment.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConcernCard
