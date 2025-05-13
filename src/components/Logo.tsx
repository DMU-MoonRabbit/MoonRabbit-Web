import React from 'react';
import clsx from 'clsx';
import { useResponsiveStore } from '../stores/useResponsiveStore';

const Logo: React.FC = () => {
  const res = useResponsiveStore((state) => state.res);

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        width: res === 'pc' ? '569px' : '80%',
        height: res === 'pc' ? '825px' : 'auto',
        maxWidth: '569px',
        margin: '0 auto',
      }}
    >
      <img
        src="images/MoonRabbitSleep2.png"
        alt="달토끼 로고"
        className="w-full h-auto object-contain mt-12"
        style={{
          maxWidth: '569px',
          maxHeight: '642px',
        }}
      />
      <div className="text-center mt-16 flex flex-col items-center justify-center w-full">
        <h1
          className={clsx(
            'font-mainFont text-center',
            res === 'pc' ? 'text-5xl' : 'text-3xl'
          )}
          style={{
            textAlign: 'center',
            margin: '0 auto',
            color: 'var(--color-darkWalnut)',
          }}
        >
          <span style={{ color: 'var(--color-lightCaramel)' }}>달</span>토끼
        </h1>
        <p
          className={clsx(
            'mt-2 font-mainFont text-center',
            res === 'pc' ? 'text-lg' : 'text-base'
          )}
          style={{
            textAlign: 'center',
            margin: '0 auto',
            color: 'var(--color-darkWalnut)',
          }}
        >
          <span style={{ color: 'var(--color-lightCaramel)' }}>Moon</span>Rabbit
        </p>
      </div>
    </div>
  );
};

export default Logo;