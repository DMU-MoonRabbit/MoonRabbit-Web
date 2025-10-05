import React, { useState } from 'react'
import clsx from 'clsx'
import ConcernCard from './ConcernCard'
import CategoryBar from './CategoryBar'
import { useResponsiveStore } from '../stores/useResponsiveStore'

const ConcernSection: React.FC = () => {
  const res = useResponsiveStore((state) => state.res)
  const columns = res === 'pc' ? 3 : 1
  const [selectedCategory, setSelectedCategory] = useState('전체')

  const concerns = [
    {
      id: 1,
      profileImage: 'images/MoonRabbitSleep2.png',
      title: '학교 생활이 힘들어요',
      category: '학교',
      content: '친구들과 잘 어울리지 못하고 있어요. 어떻게 하면 좋을까요?',
      recentComment: {
        author: '달토끼',
        text: '천천히 친해져도 괜찮아요. 당신의 페이스대로 진행하세요.',
      },
    },
    {
      id: 2,
      profileImage: 'images/MoonRabbitSleep2.png',
      title: '취업 준비가 걱정돼요',
      category: '진로',
      content: '졸업을 앞두고 있는데, 취업 준비가 너무 걱정됩니다.',
      recentComment: {
        author: '달토끼',
        text: '차근차근 준비하시면 좋은 결과가 있을 거예요.',
      },
    },
    {
      id: 3,
      profileImage: 'images/MoonRabbitSleep2.png',
      title: '가족 관계가 어려워요',
      category: '가족',
      content:
        '부모님과 자주 다투게 되고 있어요. 어떻게 대화해야 할지 모르겠어요.',
      recentComment: {
        author: '달토끼',
        text: '서로의 입장을 이해하려 노력해보세요.',
      },
    },
    {
      id: 4,
      profileImage: 'images/MoonRabbitSleep2.png',
      title: '연인과의 관계가 불안해요',
      category: '연애',
      content: '서로의 미래가 불확실해서 걱정이에요. 어떻게 해야 할까요?',
      recentComment: {
        author: '달토끼',
        text: '서로의 생각을 솔직하게 나누어보세요.',
      },
    },
    {
      id: 5,
      profileImage: 'images/MoonRabbitSleep2.png',
      title: '스트레스가 너무 심해요',
      category: '정신건강',
      content:
        '일과 공부로 인한 스트레스가 너무 심해요. 어떻게 해소해야 할까요?',
      recentComment: {
        author: '달토끼',
        text: '충분한 휴식과 운동으로 스트레스를 해소해보세요.',
      },
    },
    {
      id: 6,
      profileImage: 'images/MoonRabbitSleep2.png',
      title: '직장 생활이 힘들어요',
      category: '사회생활',
      content: '직장에서의 인간관계가 어려워요. 어떻게 적응해야 할까요?',
      recentComment: {
        author: '달토끼',
        text: '천천히 적응해도 괜찮아요. 당신의 페이스대로 진행하세요.',
      },
    },
    {
      id: 7,
      profileImage: 'images/MoonRabbitSleep2.png',
      title: '친구들과의 관계가 어색해요',
      category: '대인관계',
      content: '친구들과 만날 때마다 어색함이 느껴져요. 어떻게 해야 할까요?',
      recentComment: {
        author: '달토끼',
        text: '자연스럽게 대화를 이어가보세요. 당신의 진정성이 전달될 거예요.',
      },
    },
    {
      id: 8,
      profileImage: 'images/MoonRabbitSleep2.png',
      title: '자신감이 부족해요',
      category: '정신건강',
      content: '무엇을 해도 자신감이 생기지 않아요. 어떻게 극복해야 할까요?',
      recentComment: {
        author: '달토끼',
        text: '작은 성공부터 시작해보세요. 당신의 노력이 빛날 거예요.',
      },
    },
    {
      id: 9,
      profileImage: 'images/MoonRabbitSleep2.png',
      title: '미래가 불안해요',
      category: '진로',
      content: '앞으로의 삶이 어떻게 될지 모르겠어요. 어떻게 준비해야 할까요?',
      recentComment: {
        author: '달토끼',
        text: '현재 할 수 있는 것부터 시작해보세요. 당신의 노력이 미래를 밝게 할 거예요.',
      },
    },
  ]

  const filteredConcerns =
    selectedCategory === '전체'
      ? concerns
      : concerns.filter((concern) => concern.category === selectedCategory)

  const displayedConcerns =
    res === 'pc' ? filteredConcerns : filteredConcerns.slice(0, 3)

  return (
    <section className="w-full max-w-[1920px] mx-auto px-[47px]">
      <h2 className="text-2xl text-center text-darkWalnut font-mainFont mb-4">
        달토끼의 밤하늘
      </h2>
      <p className="text-[1.2rem] text-center text-lightWalnut font-mainFont mb-8">
        벌써 2,193개의 고민들이 밤하늘을 수놓고 있어요.
      </p>
      <div className="mb-8">
        <CategoryBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>
      <div
        className={clsx(
          'grid gap-6 mx-auto max-w-[1800px]',
          columns === 3 ? 'grid-cols-3' : 'grid-cols-1',
        )}
      >
        {displayedConcerns.map((concern) => (
          <ConcernCard
            key={concern.id}
            id={concern.id}
            profileImage={concern.profileImage}
            title={concern.title}
            category={concern.category}
            content={concern.content}
            recentComment={concern.recentComment}
          />
        ))}
      </div>
    </section>
  )
}

export default ConcernSection
