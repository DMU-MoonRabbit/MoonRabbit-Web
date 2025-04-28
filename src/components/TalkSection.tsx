import React from 'react';

const TalkSection: React.FC = () => {
  return (
    <section className="w-full max-w-[1400px] mt-16 mb-16 px-4">
      <h2 
        className="text-4xl mt-12 md:text-5xl font-mainFont text-center mb-24"
        style={{ color: 'var(--color-mainColor)' }}
      >
        편하게 이야기해요
      </h2>
      
      <div className="bg-white p-6 md:p-16 rounded-2xl md:rounded-[200px] shadow-md min-h-[220px] md:min-h-[480px] flex items-center justify-center">
        <p 
          className="text-base md:text-lg lg:text-3xl leading-relaxed text-center max-w-6xl"
          style={{ color: 'var(--color-lightWalnut)' }}
        >
          마음이 답답한데 어디에도 털어놓지 못하고 있다면,<br/> 여기는 네가 잠시 쉬어갈 수 있는 곳이야.<br/> 
          무슨 말을 해야 할지 몰라도 괜찮고, 그냥 잠시 머물다 가도 좋아. <br/><br/>
          가끔은 말하지 않아도 괜찮으니까,<br/> 오늘은 조금 더 편안해지기를 바라면서, 달토끼가 네 곁에 있을게.
        </p>
      </div>
      
      <div className="flex justify-center mt-16">
        <button 
          className="px-10 py-5 rounded-[200px] text-xl font-mainFont hover:opacity-90"
          style={{ 
            backgroundColor: 'var(--color-darkWalnut)',
            color: 'var(--color-darkBeige)'
          }}
        >
          고민상담하러가기
        </button>
      </div>
    </section>
  );
};

export default TalkSection; 