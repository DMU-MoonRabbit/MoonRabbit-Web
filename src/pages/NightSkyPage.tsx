import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CategoryBar from '../components/CategoryBar'
import ConcernCard from '../components/ConcernCard'
import CreateConcernButton from '../components/CreateConcernButton'
import CreateConcernModal from '../components/CreateConcernModal'
import { useConcernStore } from '../stores/useConcernStore'
import { useResponsiveStore } from '../stores/useResponsiveStore'

// 임시 데이터 (ConcernCard prop에 맞게 수정)
const concerns = [
  {
    id: 1,
    profileImage: 'images/MoonRabbitLogo.png',
    title: '학교 생활이 힘들어요',
    category: '학교',
    content: '친구들과 잘 어울리지 못하고 있어요. 어떻게 하면 좋을까요?',
    recentComment: {
      author: '달토끼',
      text: '천천히 친해져도 괜찮아요. 당신의 페이스대로 진행하세요.',
    },
    date: '2024-07-30',
    backgroundImage: '/images/ConcernBackground.png',
  },
  {
    id: 2,
    profileImage: 'images/MoonRabbitLogo.png',
    title: '취업 준비가 걱정돼요',
    category: '진로',
    content: '졸업을 앞두고 있는데, 취업 준비가 너무 걱정됩니다.',
    recentComment: {
      author: '달토끼',
      text: '차근차근 준비하시면 좋은 결과가 있을 거예요.',
    },
    date: '2024-07-29',
    backgroundImage: '/images/ConcernBackground.png',
  },
  {
    id: 3,
    profileImage: 'images/MoonRabbitLogo.png',
    title: '가족 관계가 어려워요',
    category: '가족',
    content:
      '부모님과 자주 다투게 되고 있어요. 어떻게 대화해야 할지 모르겠어요.',
    recentComment: {
      author: '달토끼',
      text: '서로의 입장을 이해하려 노력해보세요.',
    },
    date: '2024-07-28',
    backgroundImage: '/images/ConcernBackground.png',
  },
  {
    id: 4,
    profileImage: 'images/MoonRabbitLogo.png',
    title: '연인과의 관계가 불안해요',
    category: '연인',
    content: '서로의 미래가 불확실해서 걱정이에요. 어떻게 해야 할까요?',
    recentComment: {
      author: '달토끼',
      text: '서로의 생각을 솔직하게 나누어보세요.',
    },
    date: '2024-07-27',
    backgroundImage: '/images/ConcernBackground.png',
  },
  {
    id: 5,
    profileImage: 'images/MoonRabbitLogo.png',
    title: '스트레스가 너무 심해요',
    category: '정신건강',
    content: '일과 공부로 인한 스트레스가 너무 심해요. 어떻게 해소해야 할까요?',
    recentComment: {
      author: '달토끼',
      text: '충분한 휴식과 운동으로 스트레스를 해소해보세요.',
    },
    date: '2024-07-26',
    backgroundImage: '/images/ConcernBackground.png',
  },
  {
    id: 6,
    profileImage: 'images/MoonRabbitLogo.png',
    title: '직장 생활이 힘들어요',
    category: '사회생활',
    content: '직장에서의 인간관계가 어려워요. 어떻게 적응해야 할까요?',
    recentComment: {
      author: '달토끼',
      text: '천천히 적응해도 괜찮아요. 당신의 페이스대로 진행하세요.',
    },
    date: '2024-07-25',
    backgroundImage: '/images/ConcernBackground.png',
  },
  {
    id: 7,
    profileImage: 'images/MoonRabbitLogo.png',
    title: '친구들과의 관계가 어색해요',
    category: '대인관계',
    content: '친구들과 만날 때마다 어색함이 느껴져요. 어떻게 해야 할까요?',
    recentComment: {
      author: '달토끼',
      text: '자연스럽게 대화를 이어가보세요. 당신의 진정성이 전달될 거예요.',
    },
    date: '2024-07-24',
    backgroundImage: '/images/ConcernBackground.png',
  },
  {
    id: 8,
    profileImage: 'images/MoonRabbitLogo.png',
    title: '자신감이 부족해요',
    category: '정신건강',
    content: '무엇을 해도 자신감이 생기지 않아요. 어떻게 극복해야 할까요?',
    recentComment: {
      author: '달토끼',
      text: '작은 성공부터 시작해보세요. 당신의 노력이 빛날 거예요.',
    },
    date: '2024-07-23',
    backgroundImage: '/images/ConcernBackground.png',
  },
  {
    id: 9,
    profileImage: 'images/MoonRabbitLogo.png',
    title: '미래가 불안해요',
    category: '진로',
    content: '앞으로의 삶이 어떻게 될지 모르겠어요. 어떻게 준비해야 할까요?',
    recentComment: {
      author: '달토끼',
      text: '현재 할 수 있는 것부터 시작해보세요. 당신의 노력이 미래를 밝게 할 거예요.',
    },
    date: '2024-07-22',
    backgroundImage: '/images/ConcernBackground.png',
  },
]

const NightSkyPage: React.FC = () => {
  //고민 관련 상태관리
  const {
    selectedCategory, //현재 선택된 카테고리
    filteredConcerns, // 필터링 된 고민 목록
    isModalOpen, // 고민 작성 중인지 아닌지
    newConcernTitle, //새로 작성할 고민 제목
    newConcernContent, //고민 내용
    newConcernCategory, //고민 카테고리리
    setSelectedCategory,
    setIsModalOpen,
    setNewConcernTitle,
    setNewConcernContent,
    setNewConcernCategory,
    resetForm,
    fetchConcerns,
  } = useConcernStore()

  const { res } = useResponsiveStore()
  const navigate = useNavigate()

  useEffect(() => {
    fetchConcerns()
  }, [fetchConcerns])

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleCreateConcern = () => {
    // TODO: 고민 생성 로직 추가
    handleCloseModal()
  }

  // 모바일 뷰에서는 3개의 카드만 표시
  const displayConcerns =
    res === 'mo' ? filteredConcerns.slice(0, 3) : filteredConcerns

  const handleCardClick = (id: number) => {
    navigate(`/night-sky/${id}`)
  }

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* 배경 이미지 div */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url("/images/MoonRabbitStars.png")' }}
      ></div>

      {/* 컨텐츠 컨테이너 */}
      <div className="relative z-10 py-8 px-4">
        <div className="flex justify-between items-center mb-4 ml-2">
          <CategoryBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            disableCentering={true}
          />
          <CreateConcernButton onClick={handleOpenModal} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayConcerns.map((concern, index) => (
            <ConcernCard
              key={concern.id}
              id={concern.id}
              profileImage={concern.profileImage}
              title={concern.title}
              content={concern.content}
              category={concern.category}
              recentComment={concern.recentComment}
              date={concern.date}
              backgroundImage={concern.backgroundImage}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <CreateConcernModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onCategoryChange={setNewConcernCategory}
          selectedCategory={newConcernCategory}
          onTitleChange={setNewConcernTitle}
          onContentChange={setNewConcernContent}
          onCreateConcern={handleCreateConcern}
          title={newConcernTitle}
          content={newConcernContent}
        />
      )}
    </div>
  )
}

export default NightSkyPage
