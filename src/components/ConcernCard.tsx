import React from 'react';
import { useResponsiveStore } from '../stores/useResponsiveStore';
import clsx from 'clsx';

interface ConcernCardProps {
  profileImage: string;
  title: string;
  category: string;
  content: string;
  recentComment: {
    author: string;
    text: string;
  };
  date?: string;
  backgroundImage?: string;
}

const ConcernCard: React.FC<ConcernCardProps> = ({
  profileImage,
  title,
  category,
  content,
  recentComment,
  date,
  backgroundImage
}) => {
  const res = useResponsiveStore((state) => state.res);
  const isMobile = res === 'mo';

  return (
    <div
      className={clsx(
        'w-full min-h-[16.25rem] relative overflow-hidden mx-auto flex items-center justify-center bg-cover bg-center transition-transform duration-200 animate-float hover:translate-y-[-2px]',
        isMobile ? 'max-w-full rounded-xl px-[0.9375rem]' : 'max-w-[35rem] rounded-4xl px-[0.625rem]'
      )}
      style={{
        backgroundImage: `url(${backgroundImage || '/images/ConcernBackground.png'})`,
        boxShadow: 'inset 0 0 0 2px #473C2C',
      }}
    >
      <div className={clsx('relative z-10 w-full h-full px-[0.3125rem]')}>
        {/* 프로필 이미지 */}
        <div
          className={clsx(
            'absolute overflow-hidden transition-transform duration-200 bg-lightBackground hover:scale-105',
            isMobile
              ? 'w-[3.75rem] h-[3.75rem] rounded-[1.875rem] top-[0.9375rem] left-[1.875rem]'
              : 'w-[5rem] h-[5rem] rounded-full top-[1.1875rem] left-[1.875rem]'
          )}
        >
          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
        </div>
        
        {/* 제목 */}
        <h3
        className={clsx(
          'absolute font-mainFont bg-lightBeige text-darkWalnut rounded-full whitespace-nowrap overflow-hidden text-ellipsis',
          isMobile
            ? 'left-[6.25rem] top-[0.9375rem] text-base px-3 py-[0.25rem] max-w-[calc(100%-9rem)]'
            : 'left-[7.5rem] top-[1.5rem] text-[1.2rem] px-4 py-[0.375rem] max-w-[23.75rem]'
        )}
        >
          {title}
        </h3>


        {/* 카테고리 */}
        <div
          className={clsx(
            'absolute flex flex-wrap gap-3',
            isMobile ? 'top-[3.75rem] left-[6.25rem]' : 'top-[4.25rem] left-[7.5rem]'
          )}
        >
          {category.split(',').map((cat, i) => (
            <span
              key={i}
              className={clsx(
                'inline-block bg-lightBeige text-mainColor font-semibold rounded-full shadow-md transition-transform hover:-translate-y-[1px]',
                isMobile ? 'text-[0.8rem] px-2 py-1' : 'text-sm px-3 py-1'
              )}
            >
              {cat.trim()}
            </span>
          ))}
        </div>

        {/* 본문 */}
        <div
          className={clsx(
            'absolute bg-white rounded-xl px-4 py-2 w-[calc(100%-3.75rem)] max-w-[29.375rem]',
            isMobile
              ? 'top-[6.25rem] min-h-[3.75rem] px-3 py-2'
              : 'top-[7.4375rem] h-16 left-[1.875rem]'
          )}
        >
          <p
            className={clsx(
              'text-darkWalnut leading-snug line-clamp-2',
              isMobile ? 'text-sm' : 'text-base'
            )}
          >
            {content}
          </p>
          {date && (
            <span
              className={clsx(
                'absolute text-darkWalnut opacity-80 transition-opacity duration-200 hover:opacity-100',
                isMobile
                  ? 'right-3 bottom-[0.375rem] text-[0.65rem]'
                  : 'right-4 bottom-2 text-[0.7rem]'
              )}
            >
              {date}
            </span>
          )}
        </div>

        {/* 댓글 섹션 */}
        <div
          className={clsx(
            'absolute bg-lightBeige rounded-lg max-w-[29.375rem] w-[calc(100%-3.75rem)] flex items-center',
            isMobile
              ? 'bottom-[0.9375rem] min-h-[1.75rem] px-3 py-1 justify-start'
              : 'bottom-[1.3125rem] px-4 py-2 h-8 left-[1.875rem]'
          )}
        >
          <span
            className={clsx(
              'text-mainBlack font-semibold whitespace-nowrap overflow-hidden text-ellipsis mr-2',
              isMobile ? 'text-[0.8rem] mr-[0.375rem]' : 'text-sm'
            )}
          >
            {recentComment.author}:
          </span>
          <p
            className={clsx(
              'text-mainBlack leading-snug m-0 whitespace-nowrap overflow-hidden text-ellipsis',
              isMobile ? 'text-[0.8rem]' : 'text-sm'
            )}
          >
            {recentComment.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConcernCard;