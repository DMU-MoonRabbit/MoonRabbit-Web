import React from 'react';
import { useResponsiveStore } from '../stores/useResponsiveStore';

const Logo: React.FC = () => {
  const res = useResponsiveStore((state) => state.res);
  
  // 화면 크기에 따라 로고 크기 조정
  const logoWidth = res === 'pc' ? '569px' : '80%';
  const logoHeight = res === 'pc' ? '825px' : 'auto';
  
  // 텍스트 크기 조정
  const titleSize = res === 'pc' ? 'text-5xl' : 'text-3xl';
  const subtitleSize = res === 'pc' ? 'text-lg' : 'text-base';

  return (
    <div 
      className="flex flex-col items-center justify-center" 
      style={{ 
        width: logoWidth, 
        height: logoHeight,
        maxWidth: '569px',
        margin: '0 auto'
      }}
    >
      <img
        src="/images/MoonRabbitLogo.png"
        alt="달토끼 로고"
        className="w-full h-auto object-contain mt-12"
        style={{ 
          maxWidth: '569px',
          maxHeight: '642px'
        }}
      />
      <div className="text-center mt-16 flex flex-col items-center justify-center w-full">
        <h1 
          className={`${titleSize} font-mainFont text-center`} 
          style={{ 
            textAlign: 'center',
            margin: '0 auto',
            color: 'var(--color-darkWalnut)'
          }}
        >
          <span style={{ color: 'var(--color-lightCaramel)' }}>달</span>토끼
        </h1>
        <p 
          className={`${subtitleSize} mt-2 font-mainFont text-center`} 
          style={{ 
            textAlign: 'center',
            margin: '0 auto',
            color: 'var(--color-darkWalnut)'
          }}
        >
          <span style={{ color: 'var(--color-lightCaramel)' }}>Moon</span>Rabbit
        </p>
      </div>
    </div>
  );
};

export default Logo; 